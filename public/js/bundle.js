var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};

// src/component.ts
var ComponentBase = class {
  constructor() {
    __publicField(this, "id", `component-base`);
    __publicField(this, "class", `component-base`);
  }
  render() {
  }
  createElement(type = "div") {
    const element = document.createElement(type);
    element.id = this.id;
    return element;
  }
  getSourceElement() {
    const element = document.getElementById(this.id);
    if (!element) {
      console.error(`Element with id ${this.id} not found`);
    }
    return element ?? new HTMLElement();
  }
  setClass(element, className) {
    element.className = className;
  }
};

// src/components/file-select.ts
var FileSelect = class extends ComponentBase {
  constructor() {
    super();
    this.id = `file-select`;
  }
  render() {
  }
};

// src/controller.ts
var Controller = class {
  constructor() {
    __publicField(this, "components", []);
    __publicField(this, "componentsByEvents", /* @__PURE__ */ new Map());
  }
  register(component) {
    this.components.push(component);
  }
  registerByEvent(event, component) {
    if (!this.componentsByEvents.has(event)) {
      this.componentsByEvents.set(event, []);
    }
    this.componentsByEvents.get(event)?.push(component);
  }
  unregister(component) {
    const index = this.components.indexOf(component);
    if (index > -1) {
      this.components.splice(index, 1);
    }
  }
  unregisterByEvent(event, component) {
    const components = this.componentsByEvents.get(event);
    if (components) {
      const index = components.indexOf(component);
      if (index > -1) {
        components.splice(index, 1);
      }
    }
  }
  static registerController(type, controller) {
    this.controllerMap.set(type, controller);
  }
  static getController(type) {
    return this.controllerMap.get(type);
  }
};
__publicField(Controller, "controllerMap", /* @__PURE__ */ new Map());

// src/controllers/sprite-details-controller.ts
var SpriteCanvasData = class {
  constructor() {
    __publicField(this, "_pixelSizePx", 32);
  }
  get pixelSizePx() {
    return this._pixelSizePx;
  }
  set pixelSizePx(v) {
    this._pixelSizePx = v;
  }
};
var SpriteDetailsController = class extends Controller {
  constructor() {
    super();
    __publicField(this, "spriteCanvasData", new SpriteCanvasData());
  }
  updatePixelSizePx(newSize) {
    this.spriteCanvasData.pixelSizePx = newSize;
  }
  getPixelSizePx() {
    return this.spriteCanvasData.pixelSizePx;
  }
};
__publicField(SpriteDetailsController, "typeName", "SpriteDetailsController");

// src/components/sprite-canvas.ts
var SpriteCanvas = class extends ComponentBase {
  constructor() {
    super();
    __publicField(this, "spriteDetailsController");
    this.id = `sprite-canvas`;
    this.spriteDetailsController = Controller.getController(SpriteDetailsController.typeName);
  }
  render() {
    const element = this.getSourceElement();
    const canvas = this.configureCanvas();
    element.style.cssText = `
      grid-area: canvas;
      height: auto;
      background: #ffffff;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 1rem;
      border-radius: 10px;
    `;
    element.appendChild(canvas);
  }
  configureCanvas() {
    const canvas = document.createElement("canvas");
    canvas.id = "sprite-canvas-x";
    canvas.width = 512;
    canvas.height = 512;
    canvas.style.border = "1px solid #000000";
    canvas.addEventListener("mousemove", (e) => {
      const ctx = canvas.getContext("2d");
      ctx?.clearRect(0, 0, 512, 512);
      const pxSize = this.spriteDetailsController.getPixelSizePx();
      const xPx = Math.floor(e.offsetX / pxSize);
      const yPx = Math.floor(e.offsetY / pxSize);
      ctx?.fillText(`x: ${xPx}, y: ${yPx}`, 10, 10);
      ctx?.fillRect(xPx * pxSize, yPx * pxSize, pxSize, pxSize);
    });
    return canvas;
  }
};

// src/components/timeline.ts
var Timeline = class extends ComponentBase {
  constructor() {
    super();
    this.id = `timeline`;
  }
  render() {
    const element = this.getSourceElement();
    element.innerHTML = `<p>${this.id}</p>`;
    element.style.cssText = `
          grid-column: span 3;
          display: flex;
          flex-direction: column;
          align-items: center;
          background: #fff;
          display: flex;
          margin-top: 0.5rem;
          padding: 1rem;
          border-radius: 10px;
      `;
  }
};

// src/components/toolbar.ts
var Toolbar = class extends ComponentBase {
  constructor() {
    super();
    this.id = `toolbar`;
  }
  render() {
    const element = this.getSourceElement();
    element.innerHTML = `<button>Button</button>`;
    element.style.cssText = `
        grid-area: right;
        margin-left: 0.5rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 1rem;
        border-radius: 10px;
        `;
  }
};

// src/components/sprite-editor.ts
var SpriteEditor = class extends ComponentBase {
  constructor() {
    super();
    // Components
    __publicField(this, "rightToolbar", new Toolbar());
    __publicField(this, "bottomToolbar", new Timeline());
    __publicField(this, "canvas", new SpriteCanvas());
    this.id = `sprite-editor`;
  }
  render() {
    const element = this.getSourceElement();
    element.innerHTML = `
      <div id="${this.canvas.id}" class="canvas"></div>
      <div id="${this.rightToolbar.id}" class="toolbar"></div>
      <div id="${this.bottomToolbar.id}" class="timeline"></div>
    `;
    element.style.cssText = `
          display: grid;
          grid-template-areas: "left canvas right";
          grid-template-columns: 1fr 3fr 1fr;
          grid-template-rows: 80% auto;
          height: calc(100vh - 1rem);
          width: 100%;
          border-radius: 10px;
          `;
    this.rightToolbar.render();
    this.bottomToolbar.render();
    this.canvas.render();
  }
};

// src/components/top-bar.ts
var TopBar = class extends ComponentBase {
  constructor() {
    super(...arguments);
    __publicField(this, "id", `top-bar`);
  }
  render() {
    const element = this.getSourceElement();
    element.innerHTML = `<span><p>Top Bar</p></span>`;
    element.style.cssText = `
        grid-area: top;
        grid-column: span 3;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        padding: 1rem;
        border-radius: 10px;
        background: #ffffff;
    `;
  }
};

// src/components/app-component.ts
var AppComponent = class extends ComponentBase {
  constructor() {
    super();
    // Components
    __publicField(this, "fileSelect", new FileSelect());
    __publicField(this, "spriteEditor", new SpriteEditor());
    __publicField(this, "topBar", new TopBar());
    this.id = `app-component`;
  }
  render() {
    const element = this.getSourceElement();
    element.innerHTML = `
      <div id="${this.topBar.id}"></div>
      <div id="${this.fileSelect.id}"></div>
      <div id="${this.spriteEditor.id}"></div>
    `;
    this.spriteEditor.render();
    this.topBar.render();
  }
};

// src/controllers/app-controller.ts
var AppController = class extends Controller {
  constructor() {
    super();
  }
};
__publicField(AppController, "typeName", "AppController");

// src/app.ts
var init = () => {
  Controller.registerController(
    AppController.typeName,
    new AppController()
  );
  Controller.registerController(
    SpriteDetailsController.typeName,
    new SpriteDetailsController()
  );
  new AppComponent().render();
};
init();
//# sourceMappingURL=bundle.js.map
