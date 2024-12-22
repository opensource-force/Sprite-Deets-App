import {
  Component,
  Store,
  Style,
  StyleItem,
  Transaction,
} from "../component.ts";

export class Timeline implements Component {
  private content: string;
  id = `timeline`;

  constructor(content: string) {
    this.content = content;
  }

  needsRender(_state: Transaction): boolean {
    return true;
  }

  render(_store: Store, element: HTMLElement, style: Style): Component[] {
    element.innerHTML = `<p>${this.content}</p>`;
    style.push(
      [
        new StyleItem(
          `.${this.id}`,
          `
          grid-column: span 3;
          display: flex;
          flex-direction: column;
          align-items: center;
          background: #fff;
          display: flex;
          margin-top: 0.5rem;
          padding: 1rem;
          border-radius: 10px;
      `,
        ),
      ],
    );
    return [];
  }
}
