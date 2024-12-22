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
var Transaction = class {
  constructor(previousState, currentState) {
    __publicField(this, "previousState");
    __publicField(this, "currentState");
    this.previousState = previousState;
    this.currentState = currentState;
  }
};
var Style = class {
  constructor(id, element) {
    __publicField(this, "element");
    __publicField(this, "id");
    this.id = id;
    this.element = element;
  }
  push(styling) {
    let css = "";
    this.element.textContent = "";
    styling.forEach((styling2) => {
      css = css.concat(
        `
      ${styling2.selector} {
        ${styling2.styling}
      }
      `
      );
    });
    this.element.textContent = css;
  }
};
var StyleItem = class {
  constructor(selector, styling) {
    __publicField(this, "selector");
    __publicField(this, "styling");
    this.selector = selector;
    this.styling = styling;
  }
};
var AppState = class _AppState {
  constructor() {
    __publicField(this, "selectingFile", true);
    __publicField(this, "file", null);
  }
  clone() {
    const clone = new _AppState();
    clone.selectingFile = this.selectingFile;
    clone.file = this.file;
    return clone;
  }
};
var Store = class {
  constructor(state, component) {
    __publicField(this, "component");
    __publicField(this, "previousState", null);
    __publicField(this, "state");
    __publicField(this, "lastRenderedComponents", /* @__PURE__ */ new Set());
    this.component = component;
    this.state = state;
  }
  update() {
    const currentRenderedComponents = /* @__PURE__ */ new Set();
    this.updateComponent(this.component, currentRenderedComponents, null);
    const unrenderedComponents = [...this.lastRenderedComponents].filter(
      (id) => !currentRenderedComponents.has(id)
    );
    this.cleanupComponents(unrenderedComponents);
    this.lastRenderedComponents = currentRenderedComponents;
  }
  updateComponent(component, renderedComponents, parent) {
    let needsRender = false;
    if (this.previousState) {
      needsRender = component.needsRender(
        new Transaction(this.previousState, this.state)
      );
    } else {
      needsRender = true;
    }
    if (needsRender) {
      let element = document.getElementById(component.id);
      if (element) {
        while (element.firstChild) {
          element.removeChild(element.firstChild);
        }
        element.remove();
      } else {
        element = document.createElement("div");
        element.id = component.id;
        element.className = component.id;
      }
      const styleId = `${component.id}-style`;
      let localStyle = document.getElementById(styleId);
      if (!localStyle) {
        localStyle = document.createElement("style");
        localStyle.id = styleId;
      }
      const children = component.render(
        this,
        element,
        new Style(styleId, localStyle)
      );
      element.append(localStyle);
      if (parent) {
        parent.appendChild(element);
      } else {
        document.body.appendChild(element);
      }
      renderedComponents.add(component.id);
      children.forEach((child) => {
        this.updateComponent(child, renderedComponents, element);
      });
    } else {
      renderedComponents.add(component.id);
    }
    this.previousState = this.state.clone();
  }
  cleanupComponents(unrenderedComponents) {
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
  }
};

// src/components/file-select.ts
var FileSelect = class {
  constructor() {
    __publicField(this, "id", `file-select`);
  }
  needsRender(_state) {
    return true;
  }
  render(store2, element, style) {
    const modalWidth = 400;
    const modalPadding = 40;
    element.innerHTML = `
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
        ${store2.state.file === null ? `
            <input type="file" id="file-input">
            <label for="file-input">Open a File</label>
        ` : `
              <div class="selected-file-box">
                  <svg class="selected-file-cancel-icon" width="20px" height="20px" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#e0e0e0"><path d="M6.75827 17.2426L12.0009 12M17.2435 6.75736L12.0009 12M12.0009 12L6.75827 6.75736M12.0009 12L17.2435 17.2426"></path></svg>
                  <span class="selected-file-text">${store2.state.file.name}</span>
                  <svg class="selected-file-proceed-icon" width="20px" height="20px" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#e0e0e0"><path d="M7 12.5L10 15.5L17 8.5"></path><path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"></path></svg>
              </div>
              `}
        </div>
        </div>
        `;
    const cancelIcon = element.querySelector(".selected-file-cancel-icon");
    if (cancelIcon) {
      cancelIcon.addEventListener("click", () => {
        store2.state.file = null;
        store2.update();
      });
    }
    const proceedIcon = element.querySelector(".selected-file-proceed-icon");
    if (proceedIcon) {
      proceedIcon.addEventListener("click", () => {
        if (store2.state.file) {
          store2.state.selectingFile = false;
          store2.update();
        }
      });
    }
    const fileInput = element.querySelector("#file-input");
    if (fileInput) {
      fileInput.addEventListener("change", (event) => {
        const input = event.target;
        const file = input.files ? input.files[0] : null;
        if (file) {
          store2.state.file = file;
        }
        store2.update();
      });
    }
    style.push(
      [
        new StyleItem(
          "body",
          `
            font-family: Arial, sans-serif;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            background-color: #f0f0f0;
            `
        ),
        new StyleItem(
          ".modal",
          `
            position: relative;
            width: ${modalWidth}px;
            padding: ${modalPadding}px;
            background: white;
            border-radius: 30px;
            box-shadow: 0 4px 10px #00000010;
            text-align: center;
            `
        ),
        new StyleItem(
          ".modal h2",
          `
            font-size: 1.5rem;
            color: #333;
            `
        ),
        new StyleItem(
          ".modal p",
          `
            font-size: 1rem;
            color: #666;
            margin-top: 8px;
            margin-bottom: 20px;
            `
        ),
        new StyleItem(
          '.modal input[type="file"]',
          `
            display: none;
            `
        ),
        new StyleItem(
          ".modal label",
          `
            display: inline-block;
            font-size: 1rem;
            color: white;
            border-radius: 8px;
            cursor: pointer;
            transition: background-color 0.3s ease;
            `
        ),
        new StyleItem(
          ".border-svg",
          `
            position: absolute;
            transform: translate(-50%, 0%);
            top: 0px;
            pointer-events: none;
            `
        ),
        new StyleItem(
          ".border-svg rect",
          `
            height: calc(100% - 20px);
            width: calc(100% - 20px);
            stroke-dashoffset: 20;
            stroke: #f5f5f5;
            transition: stroke-dashoffset 0.2s ease,
              stroke 0.2s ease;
            `
        ),
        new StyleItem(
          ".modal:hover .border-svg rect",
          `
            stroke-dashoffset: 0;
            stroke: #e0e0e0;
            `
        ),
        new StyleItem(
          ".selected-file",
          `
              display: inline-block;
              padding: 10px 15px 10px 15px;
              background: #000000;
              border-radius: 9px;         
              text-align: center;
            `
        ),
        new StyleItem(
          ".selected-file:hover",
          `
              background-color: #505050;
            `
        ),
        new StyleItem(
          ".selected-file-box",
          `
              display: flex; 
              align-items: center;
              justify-content: center;
            `
        ),
        new StyleItem(
          ".selected-file-text",
          `
              margin: 0px 10px 0px 10px;
              color: #f0f0f0;    
            `
        ),
        new StyleItem(
          ".selected-file-cancel-icon",
          `
              stroke: #a0a0a0;
              cursor: pointer;
            `
        ),
        new StyleItem(
          ".selected-file-cancel-icon:hover",
          `
              stroke: #fefefe;
            `
        ),
        new StyleItem(
          ".selected-file-proceed-icon",
          `
              stroke: #a0a0a0;
              cursor: pointer;
            `
        ),
        new StyleItem(
          ".selected-file-proceed-icon:hover",
          `
              stroke: #fefefe;
            `
        )
      ]
    );
    return [];
  }
};

// src/components/sprite-canvas.ts
var SpriteCanvas = class {
  constructor(content) {
    __publicField(this, "content");
    __publicField(this, "id", `sprite-canvas`);
    this.content = content;
  }
  needsRender(_state) {
    return true;
  }
  render(_store, element, style) {
    element.innerHTML = `<p>${this.content}</p>`;
    style.push(
      [
        new StyleItem(
          `.${this.id}`,
          `
        grid-area: canvas;
        height: auto;
        background: #ffffff;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 1rem;
        border-radius: 10px;
        `
        )
      ]
    );
    return [];
  }
};

// src/components/timeline.ts
var Timeline = class {
  constructor(content) {
    __publicField(this, "content");
    __publicField(this, "id", `timeline`);
    this.content = content;
  }
  needsRender(_state) {
    return true;
  }
  render(_store, element, style) {
    element.innerHTML = `<p>${this.content}</p>`;
    style.push(
      [
        new StyleItem(
          `.${this.id}`,
          `
          grid-column: span 3;
          display: flex;
          flex-direction: column;
          align-items: center;
          background: #fff;
          display: flex;
          margin-top: 0.5rem;
          padding: 1rem;
          border-radius: 10px;
      `
        )
      ]
    );
    return [];
  }
};

// src/components/toolbar.ts
var Toolbar = class {
  constructor(position, content) {
    __publicField(this, "content");
    __publicField(this, "gridArea");
    __publicField(this, "id");
    __publicField(this, "toggle");
    this.id = `toolbar-${position}`;
    this.gridArea = position;
    this.content = content;
    this.toggle = false;
  }
  needsRender(_state) {
    return true;
  }
  render(store2, element, style) {
    element.innerHTML = `<p>${this.content}</p>`;
    element.onclick = () => {
      setTimeout(() => {
        this.toggle = !this.toggle;
        store2.update();
      }, 500);
    };
    style.push(
      [
        new StyleItem(
          `.${this.id}`,
          `
          ${this.toggle ? "background: #fff;" : "background: #ee9999;"}
          grid-area: ${this.gridArea};
          ${this.gridArea === "left" ? "margin-right: 0.5rem;" : "margin-left: 0.5rem;"}
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 1rem;
          border-radius: 10px;
      `
        )
      ]
    );
    return [];
  }
};

// src/components/sprite-editor.ts
var SpriteEditor = class {
  constructor() {
    __publicField(this, "leftToolbar");
    __publicField(this, "rightToolbar");
    __publicField(this, "bottomToolbar");
    __publicField(this, "canvas");
    __publicField(this, "id", `sprite-editor`);
    this.leftToolbar = new Toolbar("left", "Toolbar");
    this.rightToolbar = new Toolbar("right", "Toolbar");
    this.bottomToolbar = new Timeline("Timeline");
    this.canvas = new SpriteCanvas("Canvas");
  }
  needsRender(_state) {
    return true;
  }
  render(_store, _element, style) {
    style.push(
      [
        new StyleItem(
          `.${this.id}`,
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
        )
      ]
    );
    return [
      this.leftToolbar,
      this.canvas,
      this.rightToolbar,
      this.bottomToolbar
    ];
  }
};

// src/components/app-component.ts
var AppComponent = class {
  constructor() {
    __publicField(this, "id", `app-component`);
  }
  needsRender(_state) {
    return true;
  }
  render(store2, _element, _style) {
    let elements;
    if (store2.state.selectingFile) {
      elements = [
        new FileSelect()
      ];
    } else {
      elements = [
        new SpriteEditor()
      ];
    }
    return elements;
  }
};

// src/app.ts
var init = () => {
  const _newImage = new Image("<put path here>", "<put name here>");
};
var store = new Store(new AppState(), new AppComponent());
store.update();
if (document.readyState !== "loading") {
  init();
} else {
  self.addEventListener("DOMContentLoaded", init);
}
//# sourceMappingURL=bundle.js.map
