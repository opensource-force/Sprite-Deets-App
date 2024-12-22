import { Component, updateElement, updateStyle } from "../component.ts";
import { SpriteCanvas } from "./sprite-canvas.ts";
import { SpriteEditor } from "./sprite-editor.ts";
import { Timeline } from "./timeline.ts";
import { Toolbar } from "./toolbar.ts";

export class AppComponent implements Component {
  id = `app-component`;
  selectingFile = false;
  render(_contextualStyle: string | null): HTMLElement {
    let elements: HTMLElement[];
    if (this.selectingFile) {
      elements = [new FileSelect((_file) => {
        this.selectingFile = false;
        this.render(null);
      }).render(null)];
    } else {
      elements = [
        new SpriteEditor(
          new Timeline("Timeline"),
          new SpriteCanvas("Canvas"),
        ).render(null),
      ];
    }
    return updateElement(this, elements, ``);
  }
}

export class FileSelect implements Component {
  id = `file-select`;
  file: File | null = null;
  fileSelected: (file: File) => void;
  constructor(fileSelected: (file: File) => void) {
    this.fileSelected = fileSelected;
  }

  render(_contextualStyle: string | null): HTMLElement {
    const modalWidth = 400;
    const modalPadding = 40;

    const element = updateElement(
      this,
      [],
      `
      <div class="modal" position="relative">
      <svg class="border-svg" width=100% height=100%>
      <rect
        x=10px
        y=10px
        rx="20"
        ry="20"
        fill="none"
        stroke-width="4"
        stroke-dasharray="10"
        stroke-linecap="round"
      />
  </svg>
      <h2>Import Spritesheet</h2>
      <p>Choose a file to upload and get started.</p>
      <div class="selected-file">
      ${
        this.file === null
          ? `
          <input type="file" id="file-input">
          <label for="file-input">Open a File</label>
      `
          : `
            <div class="selected-file-box">
                <svg class="selected-file-cancel-icon" width="20px" height="20px" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#e0e0e0"><path d="M6.75827 17.2426L12.0009 12M17.2435 6.75736L12.0009 12M12.0009 12L6.75827 6.75736M12.0009 12L17.2435 17.2426"></path></svg>
                <span class="selected-file-text">${this.file.name}</span>
                <svg class="selected-file-proceed-icon" width="20px" height="20px" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#e0e0e0"><path d="M7 12.5L10 15.5L17 8.5"></path><path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"></path></svg>
            </div>
            `
      }
      </div>
      </div>
      `,
    );

    const cancelIcon = element.querySelector(".selected-file-cancel-icon");
    if (cancelIcon) {
      cancelIcon.addEventListener("click", () => {
        this.file = null;
        this.render(null);
      });
    }
    const proceedIcon = element.querySelector(".selected-file-proceed-icon");
    if (proceedIcon) {
      proceedIcon.addEventListener("click", () => {
        if (this.file) {
          this.fileSelected(this.file);
        }
      });
    }
    const fileInput = document.querySelector("#file-input");
    if (fileInput) {
      fileInput.addEventListener("change", (event) => {
        const input = event.target as HTMLInputElement;
        const file = input.files ? input.files[0] : null;
        if (file) {
          this.file = file;
          // const reader = new FileReader();
          // reader.onload = function (e) {
          //   console.log("File contents:", e.target?.result);
          // };
        }
        this.render(null);
      });
    }
    updateStyle(
      element,
      "body",
      null,
      `
      font-family: Arial, sans-serif;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
      background-color: #f0f0f0;
      `,
    );
    updateStyle(
      element,
      ".modal",
      null,
      `
      position: relative;
      width: ${modalWidth}px;
      padding: ${modalPadding}px;
      background: white;
      border-radius: 30px;
      box-shadow: 0 4px 10px #00000010;
      text-align: center;
      `,
    );
    updateStyle(
      element,
      ".modal h2",
      null,
      `
      font-size: 1.5rem;
      color: #333;
      `,
    );
    updateStyle(
      element,
      ".modal p",
      null,
      `
      font-size: 1rem;
      color: #666;
      margin-top: 8px;
      margin-bottom: 20px;
      `,
    );
    updateStyle(
      element,
      '.modal input[type="file"]',
      null,
      `
      display: none;
      `,
    );
    updateStyle(
      element,
      ".modal label",
      null,
      `
      display: inline-block;
      font-size: 1rem;
      color: white;
      border-radius: 8px;
      cursor: pointer;
      transition: background-color 0.3s ease;
      `,
    );
    updateStyle(
      element,
      ".border-svg",
      null,
      `
      position: absolute;
      transform: translate(-50%, 0%);
      top: 0px;
      pointer-events: none;
      `,
    );
    updateStyle(
      element,
      ".border-svg rect",
      null,
      `
      height: calc(100% - 20px);
      width: calc(100% - 20px);
      stroke-dashoffset: 20;
      stroke: #f5f5f5;
      transition: stroke-dashoffset 0.2s ease,
        stroke 0.2s ease;
      `,
    );
    updateStyle(
      element,
      ".modal:hover .border-svg rect",
      null,
      `
      stroke-dashoffset: 0;
      stroke: #e0e0e0;
      `,
    );

    updateStyle(
      element,
      ".selected-file",
      null,
      `
        display: inline-block;
        padding: 10px 15px 10px 15px;
        background: #000000;
        border-radius: 9px;         
        text-align: center;
      `,
    );

    updateStyle(
      element,
      ".selected-file:hover",
      null,
      `
        background-color: #505050;
      `,
    );

    updateStyle(
      element,
      ".selected-file-box",
      null,
      `
        display: flex; 
        align-items: center;
        justify-content: center;
      `,
    );
    updateStyle(
      element,
      ".selected-file-text",
      null,
      `
        margin: 0px 10px 0px 10px;
        color: #f0f0f0;    
      `,
    );
    updateStyle(
      element,
      ".selected-file-cancel-icon",
      null,
      `
        stroke: #a0a0a0;
        cursor: pointer;
      `,
    );
    updateStyle(
      element,
      ".selected-file-cancel-icon:hover",
      null,
      `
        stroke: #fefefe;
      `,
    );
    updateStyle(
      element,
      ".selected-file-proceed-icon",
      null,
      `
        stroke: #a0a0a0;
        cursor: pointer;
      `,
    );
    updateStyle(
      element,
      ".selected-file-proceed-icon:hover",
      null,
      `
        stroke: #fefefe;
      `,
    );
    return element;
  }
}
