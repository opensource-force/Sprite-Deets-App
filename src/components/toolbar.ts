import { Component } from "../component.ts";

export class Toolbar extends Component {
  constructor() {
    super();
    this._id = `toolbar`;
    this._class = `toolbar-class`;
  }

  override render(): void {
    const element = this.getSourceElement();

    element.style.cssText = `
        grid-area: right;
        margin-left: 0.5rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 1rem;
        border-radius: 10px;
        `;
  }
}
