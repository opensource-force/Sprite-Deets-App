import { Component } from '../component.ts';

export class LeftColumn extends Component {
  constructor() {
    super('left-column');
  }

  override render(): void {
    const element = this.getSourceElement();

    const text = document.createElement('span');
    text.innerHTML = `<p>Left Column</p>`;
    element.appendChild(text);
  }
}
