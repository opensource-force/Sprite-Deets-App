import {
  ComponentBase,
} from "../component.ts";
import { Controller } from "../controller.ts";
import { SpriteDetailsController } from "../controllers/sprite-details-controller.ts";

export class SpriteCanvas extends ComponentBase {
  private spriteDetailsController: SpriteDetailsController;

  constructor() {
    super();
    this.id = `sprite-canvas`;
    this.spriteDetailsController = Controller.getController<SpriteDetailsController>(SpriteDetailsController.typeName);
  }

  override render(): void {
    const element = this.getSourceElement();
    const canvas = this.configureCanvas();

    element.style.cssText = `
      grid-area: canvas;
      height: auto;
      background: #ffffff;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 1rem;
      border-radius: 10px;
    `;
    
    element.appendChild(canvas);
 
  }

  configureCanvas(): HTMLCanvasElement {
    const canvas = document.createElement("canvas");
    canvas.id = "sprite-canvas-x";
    canvas.width = 512;
    canvas.height = 512;
    canvas.style.border = "1px solid #000000";
    canvas.addEventListener("mousemove", (e) => {
      const ctx = canvas.getContext("2d");
      ctx?.clearRect(0, 0, 512, 512);
      const pxSize = this.spriteDetailsController.getPixelSizePx();
      const xPx = Math.floor(e.offsetX / pxSize);
      const yPx = Math.floor(e.offsetY / pxSize);
      ctx?.fillText(`x: ${xPx}, y: ${yPx}`, 10, 10);
      ctx?.fillRect(xPx * pxSize, yPx * pxSize, pxSize, pxSize);
    });
    return canvas;
  }
}
