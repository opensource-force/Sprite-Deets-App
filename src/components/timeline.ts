import { Component, updateElement, updateStyle } from "../component.ts";

export class Timeline implements Component {
  private content: string;
  id = `timeline`;

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
      display: flex;
      flex-direction: column;
      align-items: center;
      background: #fff;
      display: flex;
      margin-top: 0.5rem;
      padding: 1rem;
      border-radius: 10px;
      `,
    );
    return element;
  }
}
