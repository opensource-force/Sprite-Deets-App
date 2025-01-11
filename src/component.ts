import { MouseState } from './state/mouse-state.ts';

export abstract class Component {
  _id: string;
  _class: string;
  _sourceElement: HTMLElement | null = null;
  _childComponents: Component[] = [];

  public notify(event: string): void {
    console.error(`Event ${event} not implemented`);
  }

  constructor(id: string, className: string | null = null) {
    this._id = id;
    this._class = className ?? id;
  }

  public render(): void {
  }

  public renderChildComponents(): void {
    this._childComponents.forEach((component) => {
      component.render();
    });
  }

  protected createElement<T = HTMLDivElement>(type: string = 'div'): T {
    return Component.createElement(type, this._id, this._class) as T;
  }

  protected static createElement<T extends HTMLElement>(
    type: string,
    id: string,
    className: string | null = null,
  ): T {
    const element = document.createElement(type);
    element.id = id;
    element.className = className ?? id;
    return element as T;
  }

  protected getSourceElement(): HTMLElement {
    let element = (this._sourceElement ??= document.getElementById(this._id));
    return (element ??= Component.createElement('div', this._id, this._class)) as HTMLElement;
  }

  // Utility methods for adding and removing nodes

  protected clearSourceElementDescendants(): void {
    const element = this.getSourceElement();
    while (element.firstElementChild) {
      this.clearNodes(element.firstChild as HTMLElement);
    }
  }

  protected clearNodes(node: HTMLElement, recursive: boolean = true): void {
    while (node.firstChild) {
      if (recursive && node.firstElementChild instanceof HTMLElement) {
        this.clearNodes(node.firstElementChild as HTMLElement, recursive);
      }
      node.removeChild(node.firstElementChild as HTMLElement);
    }
  }

  public attachComponent(component: Component, parent: HTMLElement | null = null): HTMLElement {
    parent ??= this.getSourceElement();
    parent.appendChild(component.getSourceElement());
    this._childComponents.push(component);
    return parent;
  }

  public detachComponent(component: Component, element: HTMLElement | null = null): HTMLElement {
    element ??= this.getSourceElement();
    element.removeChild(component.getSourceElement());
    this._childComponents = this._childComponents.filter((c) => c !== component);
    return element;
  }

  public handleMouse(_mouse: MouseState): void {
  }
}
