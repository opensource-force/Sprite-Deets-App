var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};

// src/image/image.ts
var Image = class {
  constructor(_path, name) {
    __publicField(this, "name");
    this.name = name;
  }
  // get pixels(): Array<number> {
  // get image's pixels from the main canvas
  // }
  set pixels(newPixels) {
  }
  // etc
};

// src/component.ts
function updateStyle(element, id, contextualStyle, style) {
  const styleId = `${id}-style`;
  let localStyle = document.getElementById(styleId);
  if (!localStyle) {
    localStyle = document.createElement("style");
    localStyle.id = styleId;
  }
  localStyle.textContent = `
  ${id} {
    ${contextualStyle === null ? "" : contextualStyle}
    ${style}
  }
  `;
  element.append(localStyle);
}
function updateElement(component, children, innerHTML) {
  const id = `${component.id}`;
  let element = document.getElementById(id);
  if (element) {
    while (element.firstChild) {
      element.removeChild(element.firstChild);
    }
  } else {
    element = document.createElement("div");
    element.id = id;
    element.className = id;
    document.body.appendChild(element);
  }
  if (innerHTML) {
    element.innerHTML = innerHTML;
  }
  children.forEach((child) => {
    element.append(child);
  });
  return element;
}

// src/components/sprite-canvas.ts
var SpriteCanvas = class {
  constructor(content) {
    __publicField(this, "content");
    __publicField(this, "id", `sprite-canvas`);
    this.content = content;
  }
  render(contextualStyle) {
    const element = updateElement(this, [], `<p>${this.content}</p>`);
    updateStyle(
      element,
      `.${this.id}`,
      contextualStyle,
      `
      height: auto;
      background: #ffffff;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 1rem;
      border-radius: 10px;
      `
    );
    return element;
  }
};

// src/components/sprite-editor.ts
var SpriteEditor = class {
  constructor(leftToolbar, rightToolbar, bottomToolbar, canvas) {
    __publicField(this, "leftToolbar");
    __publicField(this, "rightToolbar");
    __publicField(this, "bottomToolbar");
    __publicField(this, "canvas");
    __publicField(this, "id", `sprite-editor`);
    this.leftToolbar = leftToolbar;
    this.rightToolbar = rightToolbar;
    this.bottomToolbar = bottomToolbar;
    this.canvas = canvas;
  }
  render(contextualStyle) {
    const element = updateElement(
      this,
      [
        this.leftToolbar.render(`
          grid-area: left;
          margin-right: 0.5rem;
          `),
        this.canvas.render("grid-area: canvas;"),
        this.rightToolbar.render(`
          grid-area: right;
          margin-left: 0.5rem;
          `),
        this.bottomToolbar.render("grid-column: span 3;")
      ],
      null
    );
    updateStyle(
      element,
      `.${this.id}`,
      contextualStyle,
      `
    display: grid;
    grid-template-areas: 
        "left canvas right";
    grid-template-columns: 1fr 3fr 1fr;
    grid-template-rows: 80% auto;
    height: calc(100vh - 1rem);
    width: 100%;
    border-radius: 10px;
    `
    );
    return element;
  }
};

// src/components/timeline.ts
var Timeline = class {
  constructor(content) {
    __publicField(this, "content");
    __publicField(this, "id", `timeline`);
    this.content = content;
  }
  render(contextualStyle) {
    const element = updateElement(this, [], `<p>${this.content}</p>`);
    updateStyle(
      element,
      `.${this.id}`,
      contextualStyle,
      `
      display: flex;
      flex-direction: column;
      align-items: center;
      background: #fff;
      display: flex;
      margin-top: 0.5rem;
      padding: 1rem;
      border-radius: 10px;
      `
    );
    return element;
  }
};

// src/components/toolbar.ts
var Toolbar = class {
  constructor(position, content) {
    __publicField(this, "position");
    __publicField(this, "content");
    __publicField(this, "id");
    __publicField(this, "toggle");
    this.id = `toolbar-${position}`;
    this.position = position;
    this.content = content;
    this.toggle = false;
  }
  render(contextualStyle) {
    const element = updateElement(this, [], `<p>${this.content}</p>`);
    element.onclick = () => {
      setTimeout(() => {
        this.toggle = !this.toggle;
        this.render(contextualStyle);
      }, 500);
    };
    updateStyle(
      element,
      `.${this.id}`,
      contextualStyle,
      `
      ${this.toggle ? "background: #fff;" : "background: #ee9999;"}
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 1rem;
      border-radius: 10px;
      `
    );
    return element;
  }
};

// src/components/app-component.ts
var AppComponent = class {
  constructor() {
    __publicField(this, "id", `app-component`);
    __publicField(this, "selectingFile", true);
  }
  render(_contextualStyle) {
    let elements;
    if (this.selectingFile) {
      elements = [new FileSelect((_file) => {
        this.selectingFile = false;
        this.render(null);
      }).render(null)];
    } else {
      elements = [
        new SpriteEditor(
          new Toolbar("left", "Toolbar"),
          new Toolbar("right", "Toolbar"),
          new Timeline("Timeline"),
          new SpriteCanvas("Canvas")
        ).render(null)
      ];
    }
    return updateElement(this, elements, ``);
  }
};
var FileSelect = class {
  constructor(fileSelected) {
    __publicField(this, "id", `file-select`);
    __publicField(this, "file", null);
    __publicField(this, "fileSelected");
    this.fileSelected = fileSelected;
  }
  render(_contextualStyle) {
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
      ${this.file === null ? `
          <input type="file" id="file-input">
          <label for="file-input">Open a File</label>
      ` : `
            <div class="selected-file-box">
                <svg class="selected-file-cancel-icon" width="20px" height="20px" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#e0e0e0"><path d="M6.75827 17.2426L12.0009 12M17.2435 6.75736L12.0009 12M12.0009 12L6.75827 6.75736M12.0009 12L17.2435 17.2426"></path></svg>
                <span class="selected-file-text">${this.file.name}</span>
                <svg class="selected-file-proceed-icon" width="20px" height="20px" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#e0e0e0"><path d="M7 12.5L10 15.5L17 8.5"></path><path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"></path></svg>
            </div>
            `}
      </div>
      </div>
      `
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
        const input = event.target;
        const file = input.files ? input.files[0] : null;
        if (file) {
          this.file = file;
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
      `
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
      `
    );
    updateStyle(
      element,
      ".modal h2",
      null,
      `
      font-size: 1.5rem;
      color: #333;
      `
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
      `
    );
    updateStyle(
      element,
      '.modal input[type="file"]',
      null,
      `
      display: none;
      `
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
      `
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
      `
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
      `
    );
    updateStyle(
      element,
      ".modal:hover .border-svg rect",
      null,
      `
      stroke-dashoffset: 0;
      stroke: #e0e0e0;
      `
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
      `
    );
    updateStyle(
      element,
      ".selected-file:hover",
      null,
      `
        background-color: #505050;
      `
    );
    updateStyle(
      element,
      ".selected-file-box",
      null,
      `
        display: flex; 
        align-items: center;
        justify-content: center;
      `
    );
    updateStyle(
      element,
      ".selected-file-text",
      null,
      `
        margin: 0px 10px 0px 10px;
        color: #f0f0f0;    
      `
    );
    updateStyle(
      element,
      ".selected-file-cancel-icon",
      null,
      `
        stroke: #a0a0a0;
        cursor: pointer;
      `
    );
    updateStyle(
      element,
      ".selected-file-cancel-icon:hover",
      null,
      `
        stroke: #fefefe;
      `
    );
    updateStyle(
      element,
      ".selected-file-proceed-icon",
      null,
      `
        stroke: #a0a0a0;
        cursor: pointer;
      `
    );
    updateStyle(
      element,
      ".selected-file-proceed-icon:hover",
      null,
      `
        stroke: #fefefe;
      `
    );
    return element;
  }
};

// src/app.ts
var init = () => {
  const _newImage = new Image("<put path here>", "<put name here>");
};
new AppComponent().render(null);
if (document.readyState !== "loading") {
  init();
} else {
  self.addEventListener("DOMContentLoaded", init);
}
//# sourceMappingURL=bundle.js.map
