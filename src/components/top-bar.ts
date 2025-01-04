import { Component } from "../component.ts";

export class TopBar extends Component {
  override _id = `top-bar`;

  override render(): void {
    const element = this.getSourceElement();

    element.innerHTML = `<span><p>Top Bar</p></span>`;
    element.style.cssText = `
        grid-area: top;
        grid-column: span 3;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        padding: 1rem;
        border-radius: 10px;
        background: #ffffff;
    `;
  }
}
