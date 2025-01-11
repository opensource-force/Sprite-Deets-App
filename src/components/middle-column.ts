import { Component } from '../component.ts';
import { SpriteCanvas } from './sprite-canvas.ts';

export class MiddleColumn extends Component {
  _spriteCanvas: SpriteCanvas;
  constructor() {
    super('middle-column');
    this._spriteCanvas = new SpriteCanvas();
  }

  override render(): void {
    const element = this.getSourceElement();

    const text = document.createElement('span');
    text.innerHTML = `<p>Middle Column</p>`;
    element.appendChild(text);

    this.attachComponent(this._spriteCanvas);

    this.renderChildComponents();
  }
}
