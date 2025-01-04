import { Component } from '../component.ts';
import { Point, Rectangle, Size } from '../common-types.ts';
import {
  AxisAlignedBoundingBoxCollider,
  CapsuleCollider,
  CircleCollider,
  Collider,
  ColliderType,
} from '../collider-types.ts';

import { colliderInfoStyle } from './styles/collider-info.css.ts';

export abstract class ColliderInfo extends Component {
  protected _collider: Collider;
  constructor(collider: Collider) {
    super();
    this._collider = collider;
  }

  override render(): void {
    const element = this.getSourceElement();

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

  public getColliderType(): ColliderType {
    return this._collider.colliderType;
  }
}

export class AABBColliderInfo extends ColliderInfo {
  public override getColliderType(): ColliderType {
    return this._aabbCollider.colliderType;
  }
  _aabbCollider: AxisAlignedBoundingBoxCollider;

  constructor(collider: AxisAlignedBoundingBoxCollider | null) {
    collider = collider ??
      new AxisAlignedBoundingBoxCollider(
        new Rectangle(new Point(0, 0), new Size(1, 1)),
      );
    super(collider);
    this._aabbCollider = collider;
  }

  override render(): void {
    super.render();
    const element = this.getSourceElement();

    const colliderInfo = this.configureColliderInfo();

    element.appendChild(colliderInfo);
  }

  configureColliderInfo(): HTMLDivElement {
    const colliderInfo = document.createElement('div');
    colliderInfo.id = 'collider-info';
    // set colliderInfo class to collider-info
    colliderInfo.className = `${colliderInfoStyle}`;

    const form = this.configureInputs();
    colliderInfo.appendChild(form);

    return colliderInfo;
  }

  configureInputs(): HTMLFormElement {
    const form = document.createElement('form');
    form.id = 'collider-info-form';
    form.style.cssText = `
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            align-items: center;
            padding: 1rem;
            border-radius: 10px;
        `;

    // x, y, width, height

    form.appendChild(this.configureInputWithLabel('X'));
    form.appendChild(this.configureInputWithLabel('Y'));
    form.appendChild(this.configureInputWithLabel('Width'));
    form.appendChild(this.configureInputWithLabel('Height'));

    return form;
  }

  configureInputWithLabel(labelText: string): HTMLElement {
    const input = document.createElement('input');
    input.type = 'number';
    input.id = 'x';
    input.name = 'x';
    input.placeholder = '1';
    input.style.cssText = `
            margin: 0.2rem;
            padding: 0.2rem;
            border-radius: 10px;
            width: 30px
        `;
    const label = document.createElement('label');
    label.htmlFor = input.id;
    label.innerText = labelText;
    label.style.cssText = `
            margin: 0.5rem;
            padding: 0.5rem;
            border-radius: 10px;
        `;
    const container = document.createElement('div');
    container.style.cssText = `
            display: flex;
            flex-direction: row;
            align-items: center;
            padding: 1rem;
            border-radius: 10px;
        `;
    container.appendChild(label);
    container.appendChild(input);
    return container;
  }
}
