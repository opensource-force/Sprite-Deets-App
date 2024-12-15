import { Image } from "./image/image.ts";
import { Toolbar } from "./components.ts/toolbar.ts";
import { SpriteCanvas } from "./components.ts/sprite-canvas.ts";
import { Timeline } from "./components.ts/timeline.ts";
import { AppComponent } from "./components.ts/app-component.ts";

const init = () => {
  // handle all your on load setup here
  const _newImage = new Image("<put path here>", "<put name here>");
  // will be useful in the future
  // window.alert(`
  //   here is where you would implement image uploading,
  //   which will give you a path,
  //   which you use in the constructor of the image,
  //   which will have the name ${newImage.name}
  // `);
};

const app = document.getElementById("app");

if (app) {
  app.appendChild(
    new AppComponent(
      new Toolbar("left", "Toolbar"),
      new Toolbar("right", "Toolbar"),
      new Timeline("Timeline"),
      new SpriteCanvas("Canvas"),
    ).render(null),
  );
}

if (document.readyState !== "loading") {
  init();
} else {
  self.addEventListener("DOMContentLoaded", init);
}
