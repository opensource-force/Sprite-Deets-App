import { Component } from "../component.ts";

export class Toolbar implements Component {
  private position: "left" | "right";
  private content: string;
  static id = `toolbar`;

  constructor(position: "left" | "right", content: string) {
    this.position = position;
    this.content = content;
  }

  render(style: string | null): HTMLElement {
    const localStyle = document.createElement("style");
    localStyle.textContent = `
        .${Toolbar.id}-${this.position} {
            ${style}
            background: #fff;
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 1rem;
            border-radius: 10px;
        }
        `;
    document.head.appendChild(localStyle);

    const toolbar = document.createElement("div");
    toolbar.className = `toolbar-${this.position}`;
    toolbar.innerHTML = `<p>${this.content}</p>`;
    return toolbar;
  }
}
