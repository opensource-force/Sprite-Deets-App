import { Component, updateElement, updateStyle } from "../component.ts";
import { Toolbar, ToolbarState } from "./toolbar.ts";

class EditorState {
  leftToolbar = new ToolbarState();
  rightToolbar = new ToolbarState();
}

export class SpriteEditor implements Component {
  leftToolbar: Toolbar;
  rightToolbar: Toolbar;
  bottomToolbar: Component;
  canvas: Component;
  id = `sprite-editor`;
  state: EditorState;

  constructor(
    bottomToolbar: Component,
    canvas: Component,
  ) {
    this.bottomToolbar = bottomToolbar;
    this.canvas = canvas;
    this.state = new EditorState();
    this.rightToolbar = new Toolbar(
      "right",
      "Toolbar",
      this.state.rightToolbar,
      () => {
        this.leftToolbar.toggle();
      },
    );
    this.leftToolbar = new Toolbar(
      "left",
      "Toolbar",
      this.state.leftToolbar,
      () => {
        this.rightToolbar.toggle();
      },
    );
  }

  render(contextualStyle: string | null): HTMLElement {
    const element = updateElement(
      this,
      [
        this.leftToolbar.render(`
          grid-area: left;
          margin-right: 0.5rem;
          `),
        this.canvas.render("grid-area: canvas;"),
        this.rightToolbar.render(`
          grid-area: right;
          margin-left: 0.5rem;
          `),
        this.bottomToolbar.render("grid-column: span 3;"),
      ],
      null,
    );
    updateStyle(
      element,
      `.${this.id}`,
      contextualStyle,
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
    );
    return element;
  }
}
