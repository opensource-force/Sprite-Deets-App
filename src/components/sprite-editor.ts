import {
  Component,
  Store,
  Style,
  StyleItem,
  Transaction,
} from "../component.ts";
import { SpriteCanvas } from "./sprite-canvas.ts";
import { Timeline } from "./timeline.ts";
import { Toolbar } from "./toolbar.ts";

export class SpriteEditor implements Component {
  leftToolbar: Toolbar;
  rightToolbar: Toolbar;
  bottomToolbar: Timeline;
  canvas: SpriteCanvas;
  id = `sprite-editor`;

  constructor() {
    this.leftToolbar = new Toolbar("left", "Toolbar");
    this.rightToolbar = new Toolbar("right", "Toolbar");
    this.bottomToolbar = new Timeline("Timeline");
    this.canvas = new SpriteCanvas("Canvas");
  }

  needsRender(_state: Transaction): boolean {
    return true;
  }

  render(
    _store: Store,
    _element: HTMLElement,
    style: Style,
  ): Component[] {
    style.push(
      [
        new StyleItem(
          `.${this.id}`,
          `
          display: grid;
          grid-template-areas: 
              "left canvas right";
          grid-template-columns: 1fr 3fr 1fr;
          grid-template-rows: 80% auto;
          height: calc(100vh - 1rem);
          width: 100%;
          border-radius: 10px;
          `,
        ),
      ],
    );
    return [
      this.leftToolbar,
      this.canvas,
      this.rightToolbar,
      this.bottomToolbar,
    ];
  }
}
