import { Component } from "../component.ts";

export class Timeline implements Component {
  private content: string;
  static id = `timeline`;

  constructor(content: string) {
    this.content = content;
  }

  render(style: string | null): HTMLElement {
    const localStyle = document.createElement("style");
    localStyle.textContent = `
        .${Timeline.id} {
            ${style}
            display: flex;
            flex-direction: column;
            align-items: center;
            background: #fff;
            display: flex;
            margin-top: 0.5rem;
            padding: 1rem;
            border-radius: 10px;
        }
        `;
    document.head.appendChild(localStyle);

    const timeline = document.createElement("div");
    timeline.className = Timeline.id;
    timeline.innerHTML = `<p>${this.content}</p>`;
    return timeline;
  }
}
