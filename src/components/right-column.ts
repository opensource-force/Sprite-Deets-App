import { Component } from '../component.ts';

export class RightColumn extends Component {
  constructor() {
    super('right-column');
  }

  override render(): void {
    const element = this.getSourceElement();

    const text = document.createElement('span');
    text.innerHTML = `<p>Right Column</p>`;
    element.appendChild(text);
  }
}
