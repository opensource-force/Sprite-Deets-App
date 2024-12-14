var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};

// src/image/image.ts
var Image = class {
  constructor(path, name) {
    __publicField(this, "name");
    this.name = name;
  }
  get pixels() {
  }
  set pixels(newPixels) {
  }
  // etc
};

// src/components.ts/toolbar.ts
var _Toolbar = class _Toolbar {
  constructor(position, content) {
    __publicField(this, "position");
    __publicField(this, "content");
    this.position = position;
    this.content = content;
  }
  render() {
    const style = document.createElement("style");
    style.textContent = `
        .${_Toolbar.id}-${this.position} {
            grid-area: ${this.position};
            background: #fff;
            display: flex;
            flex-direction: column;
            align-items: center;
            ${this.position === "right" ? "margin-left: 0.5rem;" : "margin-right: 0.5rem;"}
            padding: 1rem;
            border-radius: 10px;
        }
        `;
    document.head.appendChild(style);
    const toolbar = document.createElement("div");
    toolbar.className = `toolbar-${this.position}`;
    toolbar.innerHTML = `<p>${this.content}</p>`;
    return toolbar;
  }
};
__publicField(_Toolbar, "id", `toolbar`);
var Toolbar = _Toolbar;

// src/components.ts/sprite-canvas.ts
var _SpriteCanvas = class _SpriteCanvas {
  constructor(content) {
    __publicField(this, "content");
    this.content = content;
  }
  render() {
    const style = document.createElement("style");
    style.textContent = `
        .${_SpriteCanvas.id} {
            grid-area: canvas;
            height: auto;
            background: #ffffff;
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 1rem;
            border-radius: 10px;
          }
        `;
    document.head.appendChild(style);
    const canvas = document.createElement("div");
    canvas.className = _SpriteCanvas.id;
    canvas.innerHTML = `<p>${this.content}</p>`;
    return canvas;
  }
};
__publicField(_SpriteCanvas, "id", `sprite-canvas`);
var SpriteCanvas = _SpriteCanvas;

// src/components.ts/timeline.ts
var _Timeline = class _Timeline {
  constructor(content) {
    __publicField(this, "content");
    this.content = content;
  }
  render() {
    const style = document.createElement("style");
    style.textContent = `
        .${_Timeline.id} {
            grid-column: span 3;
            display: flex;
            flex-direction: column;
            align-items: center;
            background: #fff;
            display: flex;
            margin-top: 0.5rem;
            padding: 1rem;
            border-radius: 10px;
        }
        `;
    document.head.appendChild(style);
    const timeline = document.createElement("div");
    timeline.className = _Timeline.id;
    timeline.innerHTML = `<p>${this.content}</p>`;
    return timeline;
  }
};
__publicField(_Timeline, "id", `timeline`);
var Timeline = _Timeline;

// src/components.ts/app-component.ts
var _AppComponent = class _AppComponent {
  constructor(content, children = []) {
    __publicField(this, "children", []);
    this.content = content;
    this.children = children;
  }
  render() {
    const style = document.createElement("style");
    style.textContent = `
        .${_AppComponent.id} {
            display: grid;
            grid-template-areas: 
                "left canvas right";
            grid-template-columns: 1fr 3fr 1fr;
            grid-template-rows: 80% auto;
            height: calc(100vh - 1rem);
            width: 100%;
            border-radius: 10px;
        }
        `;
    document.head.appendChild(style);
    const app2 = document.createElement("div");
    app2.className = _AppComponent.id;
    this.children.forEach((child) => {
      app2.appendChild(child);
    });
    return app2;
  }
};
__publicField(_AppComponent, "id", `app-component`);
var AppComponent = _AppComponent;

// src/app.ts
var init = async () => {
  const newImage = new Image("<put path here>", "<put name here>");
};
var app = document.getElementById("app");
if (app) {
  app.appendChild(new AppComponent("", [
    new Toolbar("left", "Toolbar").render(),
    new Toolbar("right", "Toolbar").render(),
    new SpriteCanvas("Canvas").render(),
    new Timeline("Timeline").render()
  ]).render());
}
if (document.readyState !== "loading") {
  init().then(console.log);
} else {
  window.addEventListener("DOMContentLoaded", init);
}
//# sourceMappingURL=bundle.js.map
