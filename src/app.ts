import { AppComponent } from "./components/app-component.ts";
import { Controller } from "./controller.ts";
import { AppController } from "./controllers/app-controller.ts";
import { SpriteCanvasController } from "./controllers/sprite-canvas-controller.ts";

const init = () => {
  Controller.registerController(
    AppController.typeName,
    new AppController(),
  );
  Controller.registerController(
    SpriteCanvasController.typeName,
    new SpriteCanvasController(),
  );

  new AppComponent().render();
};

if (document.readyState !== "loading") {
  init();
} else {
  self.addEventListener("DOMContentLoaded", init);
}