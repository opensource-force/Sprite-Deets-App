import {
  ComponentBase
} from "../component.ts";

export class Toolbar extends ComponentBase {

  constructor() {
    super();
    this.id = `toolbar`;
  }

  override render(): void {
    const element = this.getSourceElement();

    element.innerHTML = `<button>Button</button>`;
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
