import { Component } from "../component.ts";

export class Timeline extends Component {
  constructor() {
    super();
    this._id = `timeline`;
  }

  override render(): void {
    const element = this.getSourceElement();

    element.innerHTML = `<p>${this._id}</p>`;
    element.style.cssText = `
          grid-column: span 3;
          display: flex;
          flex-direction: column;
          align-items: center;
          background: #fff;
          display: flex;
          margin-top: 0.5rem;
          padding: 1rem;
          border-radius: 10px;
      `;
  }
}
