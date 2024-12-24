import { Controller } from "../controller.ts";

export class SpriteCanvasData {
  private _scaledPixelSize: number = 32;
  public get scaledPixelSize(): number {
    return this._scaledPixelSize;
  }
  public set scaledPixelSize(v: number) {
    this._scaledPixelSize = v;
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
    this.spriteCanvasData.scaledPixelSize = newSize;
    this.postEvent(SpriteDetailsController.SCALED_PIXEL_SIZE_CHANGED_EVENT);
  }

  public getScaledPixelSize(): number {
    return this.spriteCanvasData.scaledPixelSize;
  }
}
