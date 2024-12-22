import {
  Component,
  StateUpdate,
  Store,
  Style,
  StyleItem,
} from "../component.ts";
import { FileSelect } from "./file-select.ts";
import { SpriteCanvas } from "./sprite-canvas.ts";
import { SpriteEditor } from "./sprite-editor.ts";
import { Timeline } from "./timeline.ts";
import { Toolbar } from "./toolbar.ts";

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
