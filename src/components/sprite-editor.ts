import { Component } from "../component.ts";
import { SpriteCanvas } from "./sprite-canvas.ts";
import { Timeline } from "./timeline.ts";
import { Toolbar } from "./toolbar.ts";

export class SpriteEditor extends Component {
  constructor() {
    super();
    this._id = `sprite-editor`;
    this._class = `sprite-editor-class`;
  }

  // Components
  rightToolbar: Toolbar = new Toolbar();
  bottomToolbar: Timeline = new Timeline();
  canvas: SpriteCanvas = new SpriteCanvas();

  override render() {
    const element = this.getSourceElement();

    element.style.cssText = `
          display: grid;
          grid-template-areas: "left canvas right";
          grid-template-columns: 1fr 3fr 1fr;
          grid-template-rows: 80% auto;
          height: calc(100vh - 1rem);
          width: 100%;
          border-radius: 10px;
          `;

    this.addComponentDivToSourceElement(this.canvas);
    this.addComponentDivToSourceElement(this.rightToolbar);
    this.addComponentDivToSourceElement(this.bottomToolbar);

    this.rightToolbar.render();
    this.bottomToolbar.render();
    this.canvas.render();
  }
}
