import {
  Component,
  Store,
  Style,
  StyleItem,
  Transaction,
} from "../component.ts";

export class SpriteCanvas implements Component {
  private content: string;
  id = `sprite-canvas`;

  constructor(content: string) {
    this.content = content;
  }

  needsRender(_state: Transaction): boolean {
    return true;
  }

  render(
    _store: Store,
    element: HTMLElement,
    style: Style,
  ): Component[] {
    element.innerHTML = `<p>${this.content}</p>`;
    style.push(
      [
        new StyleItem(
          `.${this.id}`,
          `
        grid-area: canvas;
        height: auto;
        background: #ffffff;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 1rem;
        border-radius: 10px;
        `,
        ),
      ],
    );
    return [];
  }
}
