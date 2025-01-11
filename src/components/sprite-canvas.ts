import { Component } from '../component.ts';
import { Controller } from '../controller.ts';
import { SpriteCanvasController } from '../controllers/sprite-canvas-controller.ts';
import { LayeredCanvas } from './layered-canvas.ts';
import { MouseState } from '../state/mouse-state.ts';

/**
 * The SpriteCanvas component is responsible for rendering the canvas that the user can draw on.
 */
export class SpriteCanvas extends Component {
  private spriteCanvasController: SpriteCanvasController;
  private canvas: HTMLCanvasElement;
  private configured: boolean = false;
  private mouseState: MouseState = new MouseState();
  private layerCanvas: LayeredCanvas = new LayeredCanvas();

  constructor() {
    super('sprite-canvas');
    this.spriteCanvasController = Controller.getController<
      SpriteCanvasController
    >(SpriteCanvasController.typeName);

    this.spriteCanvasController.subscribe(
      SpriteCanvasController.SCALED_PIXEL_SIZE_CHANGED_EVENT,
      this,
    );

    this.canvas = this.configureCanvas();
  }

  override notify(event: string): void {
    if (event === SpriteCanvasController.SCALED_PIXEL_SIZE_CHANGED_EVENT) {
      this.render();
    } else {
      super.notify(event);
    }
  }

  override render(): void {
    if (!this.configured) {
      const element = this.getSourceElement();

      const menu = this.configureCanvasMenu();
      menu.appendChild(this.configureIncreaseScaleButton());
      menu.appendChild(this.configureDecreaseScaleButton());
      menu.appendChild(this.configureClearButton());

      element.appendChild(this.canvas);
      element.appendChild(menu);
      this.configured = true;
    }

    this.renderCanvas();
  }

  renderCanvas(): void {
    this.drawGrid();
    this.drawCursor();
    this.layerCanvas.render();
  }

  configureCanvas(): HTMLCanvasElement {
    const canvas = Component.createElement('canvas', 'editor-canvas') as HTMLCanvasElement;
    canvas.width = 768;
    canvas.height = 512;
    this.mouseState.registerMouseEvents(canvas, this.handleMouse.bind(this));
    this.layerCanvas = new LayeredCanvas(768, 512);
    this.layerCanvas.setTargetCanvas(canvas);

    this.layerCanvas.addLayer('grid', 0, 768, 512);
    this.layerCanvas.addLayer('draw', 2, 768, 512);
    this.layerCanvas.addLayer('cursor', 10, 768, 512);

    return canvas;
  }

  override handleMouse(_mouse: MouseState): void {
    if (_mouse.leftButton.isHeld()) {
      // Handle the left button for using the active tool
      this.layerCanvas.mergeLayer('draw', (ctx) => {
        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        if (this.mouseState.isInside) {
          const pxSize = this.spriteCanvasController.getScaledPixelSize();
          const xPx = Math.floor(this.mouseState.curMousePosition.x / pxSize);
          const yPx = Math.floor(this.mouseState.curMousePosition.y / pxSize);
          ctx.fillText(`x: ${xPx}, y: ${yPx}`, 10, 10);
          ctx.fillRect(xPx * pxSize, yPx * pxSize, pxSize, pxSize);
        }
      });
    }
    this.renderCanvas();
  }

  drawGrid(): void {
    this.layerCanvas.updateLayer('grid', (ctx) => {
      if (!ctx) {
        return;
      }

      ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

      const pxSize = this.spriteCanvasController.getScaledPixelSize();
      ctx.strokeStyle = '#000000';
      ctx.lineWidth = 1;

      for (let i = 0; i < this.canvas.width; i += pxSize) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i, this.canvas.height);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(0, i);
        ctx.lineTo(this.canvas.width, i);
        ctx.stroke();
      }
    });
  }

  drawCursor(): void {
    this.layerCanvas.updateLayer('cursor', (ctx) => {
      ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      if (this.mouseState.isInside) {
        const pxSize = this.spriteCanvasController.getScaledPixelSize();
        const xPx = Math.floor(this.mouseState.curMousePosition.x / pxSize);
        const yPx = Math.floor(this.mouseState.curMousePosition.y / pxSize);
        ctx.fillText(`x: ${xPx}, y: ${yPx}`, 10, 10);
        ctx.fillRect(xPx * pxSize, yPx * pxSize, pxSize, pxSize);
      }
    });
  }

  configureCanvasMenu(): HTMLDivElement {
    const menu = document.createElement('div');
    menu.id = 'sprite-canvas-menu';
    menu.style.cssText = `
      position: relative;
      height: 100%;
    `;
    return menu;
  }

  configureIncreaseScaleButton(): HTMLButtonElement {
    const button = document.createElement('button');
    button.id = 'increase-scale-button';
    button.innerText = '+';
    button.addEventListener('click', () => {
      const newSize = this.spriteCanvasController.getScaledPixelSize() * 2;
      if (newSize > 512) return;
      this.spriteCanvasController.updateScaledPixelSize(newSize);
    });
    return button;
  }

  configureDecreaseScaleButton(): HTMLButtonElement {
    const button = document.createElement('button');
    button.id = 'decrease-scale-button';
    button.innerText = '-';
    button.addEventListener('click', () => {
      const newSize = this.spriteCanvasController.getScaledPixelSize() / 2;
      if (newSize < 1) return;
      this.spriteCanvasController.updateScaledPixelSize(newSize);
    });
    return button;
  }

  configureClearButton(): HTMLButtonElement {
    const button = Component.createElement('button', 'clear-button') as HTMLButtonElement;
    button.innerText = 'Clear';
    button.addEventListener('click', () => {
      this.layerCanvas.clearLayer('draw');
      this.renderCanvas();
    });
    return button;
  }
}
