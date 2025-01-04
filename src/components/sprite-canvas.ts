import { Component } from "../component.ts";
import { Controller } from "../controller.ts";
import { SpriteCanvasController } from "../controllers/sprite-canvas-controller.ts";
import { ColliderInfo, AABBColliderInfo } from "./collider-info.ts";
import { spriteCanvasStyle } from "./styles/sprite-canvas.css.ts";

export class SpriteCanvas extends Component {
  private spriteCanvasController: SpriteCanvasController;

  constructor() {
    super();
    this._id = `sprite-canvas`;
    this.spriteCanvasController = Controller.getController<
      SpriteCanvasController
    >(SpriteCanvasController.typeName);

    this.spriteCanvasController.subscribe(SpriteCanvasController.SCALED_PIXEL_SIZE_CHANGED_EVENT, this);
  }

  override notify(event: string): void {
    if (event === SpriteCanvasController.SCALED_PIXEL_SIZE_CHANGED_EVENT) {
      // Handled by the canvas itself
    }
    else {
      super.notify(event);
    }
  }

  override render(): void {
    const element = this.getSourceElement();

    const canvas = this.configureCanvas();

    const menu = this.configureCanvasMenu();
    menu.appendChild(this.configureIncreaseScaleButton());
    menu.appendChild(this.configureDecreaseScaleButton());

     const colliderInfoElement = this.createElement();
     colliderInfoElement.id = "collider-info";
     element.appendChild(colliderInfoElement);
     const colliderInfo = this.configureColliderInfo(colliderInfoElement);

    canvas.className = `${spriteCanvasStyle}`;


    element.appendChild(canvas);
    element.appendChild(menu);
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
      const pxSize = this.spriteCanvasController.getScaledPixelSize();
      const xPx = Math.floor(e.offsetX / pxSize);
      const yPx = Math.floor(e.offsetY / pxSize);
      ctx?.fillText(`x: ${xPx}, y: ${yPx}`, 10, 10);
      ctx?.fillRect(xPx * pxSize, yPx * pxSize, pxSize, pxSize);
    });
    return canvas;
  }

  configureCanvasMenu(): HTMLDivElement {
    const menu = document.createElement("div");
    menu.id = "sprite-canvas-menu";
    menu.style.cssText = `
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      padding: 1rem;
      border-radius: 10px;
      background: #ffffff;
    `;
    return menu;
  }

  configureIncreaseScaleButton(): HTMLButtonElement {
    const button = document.createElement("button");
    button.id = "increase-scale-button";
    button.innerText = "+";
    button.addEventListener("click", () => {
      const newSize = this.spriteCanvasController.getScaledPixelSize() * 2;
      if (newSize > 512) return;
      this.spriteCanvasController.updateScaledPixelSize(newSize);
    });
    return button;
  }

  configureDecreaseScaleButton(): HTMLButtonElement {
    const button = document.createElement("button");
    button.id = "decrease-scale-button";
    button.innerText = "-";
    button.addEventListener("click", () => {
      const newSize = this.spriteCanvasController.getScaledPixelSize() / 2;
      if (newSize < 1) return;
      this.spriteCanvasController.updateScaledPixelSize(newSize);
    });
    return button;
  }

  configureColliderInfo(element: HTMLElement): ColliderInfo {
    console.log("configureColliderInfo");
    const colliderInfo = new AABBColliderInfo(null);
    colliderInfo.configureFromSourceElement(element);
    colliderInfo.render();
    return colliderInfo;
  }

}
