import { Component, updateElement, updateStyle } from "../component.ts";

export class Toolbar implements Component {
  private position: "left" | "right";
  private content: string;
  id: string;
  toggle: boolean;

  constructor(position: "left" | "right", content: string) {
    this.id = `toolbar-${position}`;
    this.position = position;
    this.content = content;
    this.toggle = false;
  }

  render(contextualStyle: string | null): HTMLElement {
    const element = updateElement(this, [], `<p>${this.content}</p>`);
    element.onclick = () => {
      setTimeout(() => {
        this.toggle = !this.toggle;
        this.render(contextualStyle);
      }, 500);
    };
    updateStyle(
      element,
      `.${this.id}`,
      contextualStyle,
      `
      ${this.toggle ? "background: #fff;" : "background: #ee9999;"}
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 1rem;
      border-radius: 10px;
      `,
    );
    return element;
  }
}
