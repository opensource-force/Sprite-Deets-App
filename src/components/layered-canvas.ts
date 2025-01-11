/**
 * Layer for LayeredCanvas, manages a canvas element and its context.
 */
class Layer {
  public canvas: HTMLCanvasElement;
  public context: CanvasRenderingContext2D;
  public zIndex: number;
  public visible: boolean = true;

  constructor(zIndex: number, public width: number, public height: number) {
    this.canvas = document.createElement('canvas');
    this.canvas.width = width;
    this.canvas.height = height;
    this.context = this.canvas.getContext('2d') as CanvasRenderingContext2D;
    this.zIndex = zIndex;
  }

  public setSize(width: number, height: number): void {
    this.canvas.width = width;
    this.canvas.height = height;
  }
}

/**
 * RenderTarget for LayeredCanvas, manages an external canvas element and its context.
 */
class RenderTarget {
  public canvas!: HTMLCanvasElement;
  public context!: CanvasRenderingContext2D;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.context = canvas.getContext('2d') as CanvasRenderingContext2D;
  }
}

/**
 * LayeredCanvas, manages multiple layers of canvas elements.
 */
export class LayeredCanvas {
  virtualLayers: Layer[] = [];
  layerMap: Map<string, Layer> = new Map<string, Layer>();
  imLayer: Layer;
  renderTarget: RenderTarget | null = null;

  constructor(width: number = 0, height: number = 0) {
    this.imLayer = new Layer(0, width, height);
    this.setSize(width, height);
  }

  render(): void {
    if (!this.renderTarget) {
      return;
    }

    const ctx = this.renderTarget.context;
    ctx.clearRect(0, 0, this.renderTarget.canvas.width, this.renderTarget.canvas.height);
    this.virtualLayers.forEach((layer) => {
      if (!layer.visible) {
        return;
      }
      ctx.drawImage(layer.canvas, 0, 0);
    });
  }

  public setSize(width: number, height: number): void {
    this.imLayer?.setSize(width, height);
    this.virtualLayers.forEach((layer) => {
      layer.width = width;
      layer.height = height;
    });
  }

  public setTargetCanvas(canvas: HTMLCanvasElement): void {
    this.renderTarget = new RenderTarget(canvas);
  }

  public addLayer(name: string, zIndex: number, width: number, height: number): Layer {
    const layer = new Layer(zIndex, width, height);
    this.layerMap.set(name, layer);
    this.virtualLayers.push(layer);
    this.virtualLayers.sort((a, b) => a.zIndex - b.zIndex);
    return layer;
  }

  public updateLayer(name: string, fn: (ctx: CanvasRenderingContext2D) => void): void {
    const layer = this.layerMap.get(name);
    if (layer) {
      fn(layer.context);
    }
  }

  public mergeLayer(name: string, fn: (ctx: CanvasRenderingContext2D) => void): void {
    const layer = this.layerMap.get(name);
    if (!layer) {
      return;
    }

    fn(this.imLayer?.context as CanvasRenderingContext2D);
    const comp = layer.context.globalCompositeOperation;
    layer.context.globalCompositeOperation = 'source-over';
    layer.context.drawImage(this.imLayer.canvas, 0, 0);
    layer.context.globalCompositeOperation = comp;
  }

  public clearLayer(name: string): void {
    const layer = this.layerMap.get(name);
    if (layer) {
      layer.context.clearRect(0, 0, layer.canvas.width, layer.canvas.height);
    }
  }

  public clearAllLayers(): void {
    this.virtualLayers.forEach((layer) => {
      layer.context.clearRect(0, 0, layer.canvas.width, layer.canvas.height);
    });
  }
}
