export abstract class Component {
  id: string = `component-base`;
  class: string = `component-base-class`;
  sourceElement: HTMLElement | null = null;

  public notify(event: string): void {
    console.error(`Event ${event} not implemented`);
  }

  public render(): void {
  }

  protected createElement(type: string = "div"): HTMLElement {
    const element = document.createElement(type);
    element.id = this.id;
    return element;
  }

  protected getSourceElement(): HTMLElement {
    const element = (this.sourceElement ??= document.getElementById(this.id));
    if (!element) {
      console.error(`Element with id ${this.id} not found`);
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
    this.addDiv(element, component.id, component.class);
  }

  protected addComponentDivToSourceElement(component: Component): void {
    const element = this.getSourceElement();
    this.addComponentDiv(element, component);
  }

  protected setClass(element: HTMLElement, className: string): void {
    element.className = className;
  }
}

// export class StateUpdate {
//   previousState: AppState;
//   currentState: AppState;
//   constructor(previousState: AppState, currentState: AppState) {
//     this.previousState = previousState;
//     this.currentState = currentState;
//   }
// }

// export class Style {
//   element: HTMLStyleElement;
//   id: string;
//   constructor(id: string, element: HTMLStyleElement) {
//     this.id = id;
//     this.element = element;
//   }
//   push(styling: StyleItem[]) {
//     //let css = "";
//     //this.element.textContent = "";
//     // styling.forEach((styling) => {
//     //   css = css.concat(
//     //     `
//     //   ${styling.selector} {
//     //     ${styling.styling}
//     //   }
//     //   `,
//     //   );
//     // });
//     //this.element.textContent = css;
//   }
// }

// export class StyleItem {
//   selector: string;
//   styling: string;
//   constructor(selector: string, styling: string) {
//     this.selector = selector;
//     this.styling = styling;
//   }
// }

// export class AppState {
//   selectingFile = true;
//   file: File | null = null;
//   clone(): AppState {
//     const clone = new AppState();
//     clone.selectingFile = this.selectingFile;
//     clone.file = this.file;
//     return clone;
//   }
// }

// export class Store {
//   component: Component;
//   previousState: AppState | null = null;
//   state: AppState;
//   lastRenderedComponents: Set<string> = new Set();

//   constructor(state: AppState, component: Component) {
//     this.component = component;
//     this.state = state;
//   }

//   update() {
//     const currentRenderedComponents = new Set<string>;
//     this.updateComponent(this.component, currentRenderedComponents, null);

//     const unrenderedComponents = [...this.lastRenderedComponents].filter(
//       (id) => !currentRenderedComponents.has(id),
//     );
//     unrenderedComponents.forEach((id) => {
//       const element = document.getElementById(id);
//       if (element) {
//         element.remove();
//       }
//       const styleElement = document.getElementById(`${id}-style`);
//       if (styleElement) {
//         styleElement.remove();
//       }
//     });
//     this.lastRenderedComponents = currentRenderedComponents;
//   }

//   // updateComponent(
//   //   component: Component,
//   //   renderedComponents: Set<string>,
//   //   parent: HTMLElement | null,
//   // ) {
//     //let needsRender = false;

//     // if (this.previousState) {
//     //   needsRender = component.needsRender(
//     //     new StateUpdate(this.previousState, this.state),
//     //   );
//     // } else {
//     //   needsRender = true;
//     // }

//     // if (needsRender) {
//     //   let element = document.getElementById(component.id);
//     //   if (element) {
//     //     while (element.firstChild) {
//     //       element.removeChild(element.firstChild);
//     //     }
//     //     element.remove();
//     //   } else {
//     //     element = document.createElement("div");
//     //     element.id = component.id;
//     //     element.className = component.id;
//     //   }

//     //   const styleId = `${component.id}-style`;
//     //   let localStyle = document.getElementById(styleId) as HTMLStyleElement;
//     //   if (!localStyle) {
//     //     localStyle = document.createElement("style");
//     //     localStyle.id = styleId;
//     //   }

//     //   const children = component.render(
//     //     this,
//     //     element,
//     //     new Style(styleId, localStyle),
//     //   );

//     //   element.append(localStyle);
//     //   if (parent) {
//     //     parent.appendChild(element);
//     //   } else {
//     //     document.body.appendChild(element);
//     //   }

//     //   renderedComponents.add(component.id);

//     //   children.forEach((child) => {
//     //     this.updateComponent(child, renderedComponents, element);
//     //   });
//     // } else {
//     //   renderedComponents.add(component.id);
//     // }

//     // this.previousState = this.state.clone();
//   //}
// }
