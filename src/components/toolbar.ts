import {
  Component,
  StateUpdate,
  Store,
  Style,
  StyleItem,
} from "../component.ts";

export class Toolbar implements Component {
  private content: string;
  gridArea: string;
  id: string;
  toggle: boolean;

  constructor(position: "left" | "right", content: string) {
    this.id = `toolbar-${position}`;
    this.gridArea = position;
    this.content = content;
    this.toggle = false;
  }

  needsRender(_state: StateUpdate): boolean {
    return true;
  }

  render(store: Store, element: HTMLElement, style: Style): Component[] {
    element.innerHTML = `<p>${this.content}</p>`;
    element.onclick = () => {
      setTimeout(() => {
        this.toggle = !this.toggle;
        store.update();
      }, 500);
    };
    style.push(
      [
        new StyleItem(
          `.${this.id}`,
          `
          ${this.toggle ? "background: #fff;" : "background: #ee9999;"}
          grid-area: ${this.gridArea};
          ${
            this.gridArea === "left"
              ? "margin-right: 0.5rem;"
              : "margin-left: 0.5rem;"
          }
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
