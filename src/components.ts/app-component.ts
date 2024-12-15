import { Component } from "../component.ts";

export class AppComponent implements Component {
  leftToolbar: Component;
  rightToolbar: Component;
  bottomToolbar: Component;
  canvas: Component;
  static id = `app-component`;

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

  render(_style: string | null): HTMLElement {
    const style = document.createElement("style");
    style.textContent = `
        .${AppComponent.id} {
            display: grid;
            grid-template-areas: 
                "left canvas right";
            grid-template-columns: 1fr 3fr 1fr;
            grid-template-rows: 80% auto;
            height: calc(100vh - 1rem);
            width: 100%;
            border-radius: 10px;
        }
        `;
    document.head.appendChild(style);

    const app = document.createElement("div");
    app.className = AppComponent.id;

    app.appendChild(this.leftToolbar.render(`
    grid-area: left;
    margin-right: 0.5rem;
    `));
    app.appendChild(this.canvas.render("grid-area: canvas;"));
    app.appendChild(this.rightToolbar.render(`
    grid-area: right;
    margin-left: 0.5rem;
    `));
    app.appendChild(this.bottomToolbar.render("grid-column: span 3;"));

    return app;
  }
}
