import { Controller } from "../controller.ts";

export class SpriteCanvasData {
  private _pixelSizePx: number = 32;
  public get pixelSizePx(): number {
    return this._pixelSizePx;
  }
  public set pixelSizePx(v: number) {
    this._pixelSizePx = v;
  }
}

export class SpriteDetailsController extends Controller {
  public static typeName: string = "SpriteDetailsController";
  spriteCanvasData: SpriteCanvasData = new SpriteCanvasData();

  public static readonly SCALED_PIXEL_SIZE_CHANGED_EVENT: string = "SCALED_PIXEL_SIZE_CHANGED_EVENT";

  constructor() {
    super();
  }

  public updateScaledPixelSize(newSize: number) {
    this.spriteCanvasData.pixelSizePx = newSize;
    this.postEvent(SpriteDetailsController.SCALED_PIXEL_SIZE_CHANGED_EVENT);
  }

  public getScaledPixelSize(): number {
    return this.spriteCanvasData.pixelSizePx;
  }
}
