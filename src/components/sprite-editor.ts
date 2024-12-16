import { Component, updateElement, updateStyle } from "../component.ts";

export class SpriteEditor implements Component {
  leftToolbar: Component;
  rightToolbar: Component;
  bottomToolbar: Component;
  canvas: Component;
  id = `sprite-editor`;

  constructor(
    leftToolbar: Component,
    rightToolbar: Component,
    bottomToolbar: Component,
    canvas: Component,
  ) {
    this.leftToolbar = leftToolbar;
    this.rightToolbar = rightToolbar;
    this.bottomToolbar = bottomToolbar;
    this.canvas = canvas;
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
