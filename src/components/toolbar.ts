import { Component, updateElement, updateStyle } from "../component.ts";

export class ToolbarState {
  toggle = false;
}

export class Toolbar implements Component {
  private position: "left" | "right";
  private content: string;
  id: string;
  state: ToolbarState;
  onClick: () => void;

  constructor(
    position: "left" | "right",
    content: string,
    state: ToolbarState,
    onClick: () => void,
  ) {
    this.id = `toolbar-${position}`;
    this.position = position;
    this.content = content;
    this.state = state;
    this.onClick = onClick;
  }

  render(contextualStyle: string | null): HTMLElement {
    const element = updateElement(this, [], `<p>${this.content}</p>`);
    element.onclick = this.onClick;
    updateStyle(
      element,
      `.${this.id}`,
      contextualStyle,
      `
      ${this.state.toggle ? "background: #fff;" : "background: #ee9999;"}
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 1rem;
      border-radius: 10px;
      `,
    );
    return element;
  }

  toggle(): void {
    this.state.toggle = !this.state.toggle;
    this.render(null);
  }
}
