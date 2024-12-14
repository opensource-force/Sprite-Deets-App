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

// src/app.ts
console.log("hey there pardner");
var init = async () => {
  document.getElementById("upload-image").addEventListener("click", (evt) => {
    const newImage = new Image("<put path here>", "<put name here>");
    window.alert(`
      here is where you would implement image uploading, 
      which will give you a path, 
      which you use in the constructor of the image,
      which will have the name ${newImage.name}
    `);
  });
};
if (document.readyState !== "loading") {
  init().then(console.log);
} else {
  window.addEventListener("DOMContentLoaded", init);
}
//# sourceMappingURL=bundle.js.map
