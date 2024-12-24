import { ComponentBase } from "../component.ts";
import { FileSelect } from "./file-select.ts";
import { SpriteEditor } from "./sprite-editor.ts";
import { TopBar } from "./top-bar.ts";

export class AppComponent extends ComponentBase {
  // Components
  fileSelect: FileSelect = new FileSelect();
  spriteEditor: SpriteEditor = new SpriteEditor();
  topBar: TopBar = new TopBar();

  constructor() {
    super();
    this.id = `app-component`;
  }

  override render(): void {
    const element = this.getSourceElement();

    element.innerHTML = `
      <div id="${this.topBar.id}"></div>
      <div id="${this.fileSelect.id}"></div>
      <div id="${this.spriteEditor.id}"></div>
    `;

    this.spriteEditor.render();
    this.topBar.render();
  }
}
