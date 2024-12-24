import { Component } from "../component.ts";
import { FileSelect } from "./file-select.ts";
import { SpriteEditor } from "./sprite-editor.ts";
import { TopBar } from "./top-bar.ts";

export class AppComponent extends Component {
  // Components
  fileSelect: FileSelect = new FileSelect();
  spriteEditor: SpriteEditor = new SpriteEditor();
  topBar: TopBar = new TopBar();

  constructor() {
    super();
    this.id = `app-component`;
  }

  override render(): void {
    this.clearSourceElementDescendants();

    this.addComponentDivToSourceElement(this.topBar);
    this.addComponentDivToSourceElement(this.fileSelect);
    this.addComponentDivToSourceElement(this.spriteEditor);

    this.spriteEditor.render();
    this.topBar.render();
  }
}
