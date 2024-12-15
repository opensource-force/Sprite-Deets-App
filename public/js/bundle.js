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
function updateStyle(component, contextualStyle, style) {
  const styleId = `${component.id}-style`;
  let localStyle = document.getElementById(styleId);
  if (!localStyle) {
    localStyle = document.createElement("style");
    localStyle.id = styleId;
    document.head.appendChild(localStyle);
  }
  localStyle.textContent = `
        .${component.id} {
            ${contextualStyle === null ? "" : contextualStyle}
            ${style}
        }
        `;
}
function updateElement(component, children, innerHTML) {
  const id = `${component.id}`;
  let element = document.getElementById(id);
  if (element) {
    children.forEach((child) => {
      element?.removeChild(child);
    });
  } else {
    element = document.createElement("div");
    element.id = id;
    element.className = id;
    document.head.appendChild(element);
  }
  children.forEach((child) => {
    element.append(child);
  });
  if (innerHTML) {
    element.innerHTML = innerHTML;
  }
  return element;
}

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
    updateStyle(
      this,
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
    const element = updateElement(this, [], `<p>${this.content}</p>`);
    element.onclick = () => {
      setTimeout(() => {
        this.toggle = !this.toggle;
        this.render(contextualStyle);
      }, 500);
    };
    return element;
  }
};

// src/components/sprite-canvas.ts
var SpriteCanvas = class {
  constructor(content) {
    __publicField(this, "content");
    __publicField(this, "id", `sprite-canvas`);
    this.content = content;
  }
  render(contextualStyle) {
    updateStyle(
      this,
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
    return updateElement(this, [], `<p>${this.content}</p>`);
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
    updateStyle(
      this,
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
    return updateElement(this, [], `<p>${this.content}</p>`);
  }
};

// src/components/app-component.ts
var AppComponent = class {
  constructor(leftToolbar, rightToolbar, bottomToolbar, canvas) {
    __publicField(this, "leftToolbar");
    __publicField(this, "rightToolbar");
    __publicField(this, "bottomToolbar");
    __publicField(this, "canvas");
    __publicField(this, "id", `app-component`);
    this.leftToolbar = leftToolbar;
    this.rightToolbar = rightToolbar;
    this.bottomToolbar = bottomToolbar;
    this.canvas = canvas;
  }
  render(contextualStyle) {
    updateStyle(
      this,
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
    return updateElement(
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
  }
};

// src/app.ts
var init = () => {
  const _newImage = new Image("<put path here>", "<put name here>");
};
var app = document.getElementById("app");
if (app) {
  app.appendChild(
    new AppComponent(
      new Toolbar("left", "Toolbar"),
      new Toolbar("right", "Toolbar"),
      new Timeline("Timeline"),
      new SpriteCanvas("Canvas")
    ).render(null)
  );
}
if (document.readyState !== "loading") {
  init();
} else {
  self.addEventListener("DOMContentLoaded", init);
}
//# sourceMappingURL=bundle.js.map
