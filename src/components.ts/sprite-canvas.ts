import { Component } from "../component.ts";

export class SpriteCanvas implements Component {
  private content: string;
  static id = `sprite-canvas`;

  constructor(content: string) {
    this.content = content;
  }

  render(style: string | null): HTMLElement {
    const localStyle = document.createElement("style");
    localStyle.textContent = `
        .${SpriteCanvas.id} {
            ${style}
            height: auto;
            background: #ffffff;
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 1rem;
            border-radius: 10px;
          }
        `;
    document.head.appendChild(localStyle);

    const canvas = document.createElement("div");
    canvas.className = SpriteCanvas.id;
    canvas.innerHTML = `<p>${this.content}</p>`;
    return canvas;
  }
}
