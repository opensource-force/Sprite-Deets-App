import { Component, updateElement, updateStyle } from "../component.ts";

export class SpriteCanvas implements Component {
  private content: string;
  id = `sprite-canvas`;

  constructor(content: string) {
    this.content = content;
  }

  render(contextualStyle: string | null): HTMLElement {
    const element = updateElement(this, [], `<p>${this.content}</p>`);
    updateStyle(
      element,
      `.${this.id}`,
      contextualStyle,
      `
      height: auto;
      background: #ffffff;
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
