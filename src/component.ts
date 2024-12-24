export interface Component {
  id: string;
  /// Returns true if the views associated with this component should be updated based on the state update.
  //needsRender(stateUpdate: StateUpdate): boolean;
  /// Customize the HTMLElement & Style associated with this Component
  /// Returns child components, if any
  render(): void;
}

export abstract class ComponentBase implements Component {
  id: string = `component-base`;
  class: string = `component-base`;

  public render(): void {
  }

  protected createElement(type: string = "div"): HTMLElement {
    const element = document.createElement(type);
    element.id = this.id;
    return element;
  }

  protected getSourceElement(): HTMLElement {
    const element = document.getElementById(this.id);
    if (!element) {
      console.error(`Element with id ${this.id} not found`);
    }
    return element ?? new HTMLElement();
  }

  protected setClass(element: HTMLElement, className: string): void {
    element.className = className;
  }
}

export class StateUpdate {
  previousState: AppState;
  currentState: AppState;
  constructor(previousState: AppState, currentState: AppState) {
    this.previousState = previousState;
    this.currentState = currentState;
  }
}

export class Style {
  element: HTMLStyleElement;
  id: string;
  constructor(id: string, element: HTMLStyleElement) {
    this.id = id;
    this.element = element;
  }
  push(styling: StyleItem[]) {
    let css = "";
    this.element.textContent = "";
    // styling.forEach((styling) => {
    //   css = css.concat(
    //     `
    //   ${styling.selector} {
    //     ${styling.styling}
    //   }
    //   `,
    //   );
    // });
    this.element.textContent = css;
  }
}

export class StyleItem {
  selector: string;
  styling: string;
  constructor(selector: string, styling: string) {
    this.selector = selector;
    this.styling = styling;
  }
}

export class AppState {
  selectingFile = true;
  file: File | null = null;
  clone(): AppState {
    const clone = new AppState();
    clone.selectingFile = this.selectingFile;
    clone.file = this.file;
    return clone;
  }
}

export class Store {
  component: Component;
  previousState: AppState | null = null;
  state: AppState;
  lastRenderedComponents: Set<string> = new Set();

  constructor(state: AppState, component: Component) {
    this.component = component;
    this.state = state;
  }

  update() {
    const currentRenderedComponents = new Set<string>;
    this.updateComponent(this.component, currentRenderedComponents, null);

    const unrenderedComponents = [...this.lastRenderedComponents].filter(
      (id) => !currentRenderedComponents.has(id),
    );
    unrenderedComponents.forEach((id) => {
      const element = document.getElementById(id);
      if (element) {
        element.remove();
      }
      const styleElement = document.getElementById(`${id}-style`);
      if (styleElement) {
        styleElement.remove();
      }
    });
    this.lastRenderedComponents = currentRenderedComponents;
  }

  updateComponent(
    component: Component,
    renderedComponents: Set<string>,
    parent: HTMLElement | null,
  ) {
    let needsRender = false;
    
    // if (this.previousState) {
    //   needsRender = component.needsRender(
    //     new StateUpdate(this.previousState, this.state),
    //   );
    // } else {
    //   needsRender = true;
    // }

    // if (needsRender) {
    //   let element = document.getElementById(component.id);
    //   if (element) {
    //     while (element.firstChild) {
    //       element.removeChild(element.firstChild);
    //     }
    //     element.remove();
    //   } else {
    //     element = document.createElement("div");
    //     element.id = component.id;
    //     element.className = component.id;
    //   }

    //   const styleId = `${component.id}-style`;
    //   let localStyle = document.getElementById(styleId) as HTMLStyleElement;
    //   if (!localStyle) {
    //     localStyle = document.createElement("style");
    //     localStyle.id = styleId;
    //   }

    //   const children = component.render(
    //     this,
    //     element,
    //     new Style(styleId, localStyle),
    //   );

    //   element.append(localStyle);
    //   if (parent) {
    //     parent.appendChild(element);
    //   } else {
    //     document.body.appendChild(element);
    //   }

    //   renderedComponents.add(component.id);

    //   children.forEach((child) => {
    //     this.updateComponent(child, renderedComponents, element);
    //   });
    // } else {
    //   renderedComponents.add(component.id);
    // }

    // this.previousState = this.state.clone();
  }
}
