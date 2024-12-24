import { Component } from "./component.ts";

export abstract class Controller {
  private static controllerMap: Map<string, Controller> = new Map();

  protected readonly components: Component[] = [];
  protected readonly componentsByEvents: Map<string, Component[]> = new Map();

  register(component: Component) {
    this.components.push(component);
  }

  registerByEvent(event: string, component: Component) {
    if (!this.componentsByEvents.has(event)) {
      this.componentsByEvents.set(event, []);
    }
    this.componentsByEvents.get(event)?.push(component);
  }

  unregister(component: Component) {
    const index = this.components.indexOf(component);
    if (index > -1) {
      this.components.splice(index, 1);
    }
  }

  unregisterByEvent(event: string, component: Component) {
    const components = this.componentsByEvents.get(event);
    if (components) {
      const index = components.indexOf(component);
      if (index > -1) {
        components.splice(index, 1);
      }
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
