import { Component } from "./component.ts";

export abstract class Controller {
  private static controllerMap: Map<string, Controller> = new Map();

  protected readonly componentsByEvents: Map<string, Component[]> = new Map();

  subscribe(event: string, component: Component) {
    if (!this.componentsByEvents.has(event)) {
      this.componentsByEvents.set(event, []);
    }
    this.componentsByEvents.get(event)?.push(component);
  }

  unsubscribe(event: string, component: Component) {
    const components = this.componentsByEvents.get(event);
    if (components) {
      const index = components.indexOf(component);
      if (index > -1) {
        components.splice(index, 1);
      }
    }
  }

  postEvent(event: string): void {
    const components = this.componentsByEvents.get(event);
    if (components) {
      components.forEach((component) => {
        component.notify(event);
      });
    }
  }

  public static registerController<T extends Controller>(
    type: string,
    controller: T,
  ): void {
    this.controllerMap.set(type, controller);
  }

  public static getController<T>(
    type: string,
  ): T extends Controller ? T : never {
    return this.controllerMap.get(type) as T extends Controller ? T : never;
  }
}
