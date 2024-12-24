import { AppComponent } from "./components/app-component.ts";
import { Controller } from "./controller.ts";
import { AppController } from "./controllers/app-controller.ts";
import { SpriteDetailsController } from "./controllers/sprite-details-controller.ts";


const init = () => {
  Controller.registerController(
    AppController.typeName,
    new AppController(),
  );
  Controller.registerController(
    SpriteDetailsController.typeName,
    new SpriteDetailsController(),
  );

  new AppComponent().render();
};

init();
