export abstract class Component {
  _id: string = `component-base`;
  _class: string = `component-base-class`;
  _sourceElement: HTMLElement | null = null;

  public notify(event: string): void {
    console.error(`Event ${event} not implemented`);
  }

  public render(): void {
  }

  protected createElement(type: string = "div"): HTMLElement {
    const element = document.createElement(type);
    return element;
  }

  protected getSourceElement(): HTMLElement {
    const element = (this._sourceElement ??= document.getElementById(this._id));
    if (!element) {
      console.error(`Element with id ${this._id} not found`);
    }
    return element ?? new HTMLElement();
  }

  // Utility methods for adding and removing nodes

  protected clearSourceElementDescendants(): void {
    const element = this.getSourceElement();
    while (element.firstChild) {
      this.clearNodes(element.firstChild as HTMLElement);
    }
  }

  protected clearNodes(node: HTMLElement, recursive: boolean = true): void {
    while (node.firstChild) {
      if (recursive && node.firstChild instanceof HTMLElement) {
        this.clearNodes(node.firstChild as HTMLElement, recursive);
      }
      node.removeChild(node.firstChild);
    }
  }

  protected addDiv(element: HTMLElement, id: string, className: string): void {
    const div = document.createElement("div");
    div.id = id;
    div.className = className;
    element.appendChild(div);
  }

  protected addDivToSourceElement(id: string, className: string): void {
    const element = this.getSourceElement();
    this.addDiv(element, id, className);
  }

  protected addComponentDiv(element: HTMLElement, component: Component): void {
    this.addDiv(element, component._id, component._class);
  }

  protected addComponentDivToSourceElement(component: Component): void {
    const element = this.getSourceElement();
    this.addComponentDiv(element, component);
  }

  public configureFromSourceElement(sourceElement: HTMLElement): void {
    this._sourceElement = sourceElement;
    this._id = sourceElement.id;
    this._class = sourceElement.className;
  }
}

