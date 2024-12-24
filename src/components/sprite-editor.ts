import {
  Component,
  ComponentBase,
} from "../component.ts";
import { SpriteCanvas } from "./sprite-canvas.ts";
import { Timeline } from "./timeline.ts";
import { Toolbar } from "./toolbar.ts";

export class SpriteEditor extends ComponentBase {
  
  constructor() {
    super();
    this.id = `sprite-editor`;
  }

  // Components
  rightToolbar: Toolbar = new Toolbar();
  bottomToolbar: Timeline = new Timeline();
  canvas: SpriteCanvas = new SpriteCanvas();

  override render() {
    const element = this.getSourceElement();

    element.innerHTML = `
      <div id="${this.canvas.id}" class="canvas"></div>
      <div id="${this.rightToolbar.id}" class="toolbar"></div>
      <div id="${this.bottomToolbar.id}" class="timeline"></div>
    `;
    element.style.cssText = `
          display: grid;
          grid-template-areas: "left canvas right";
          grid-template-columns: 1fr 3fr 1fr;
          grid-template-rows: 80% auto;
          height: calc(100vh - 1rem);
          width: 100%;
          border-radius: 10px;
          `;

    this.rightToolbar.render();
    this.bottomToolbar.render();
    this.canvas.render();
  }
}
