import { Component, StateUpdate, Store, Style } from "../component.ts";
import { FileSelect } from "./file-select.ts";
import { SpriteEditor } from "./sprite-editor.ts";

export class AppComponent implements Component {
  id = `app-component`;
  needsRender(_state: StateUpdate): boolean {
    return true;
  }
  render(
    store: Store,
    _element: HTMLElement,
    _style: Style,
  ): Component[] {
    let elements: Component[];
    if (store.state.selectingFile) {
      elements = [
        new FileSelect(),
      ];
    } else {
      elements = [
        new SpriteEditor(),
      ];
    }
    return elements;
  }
}
