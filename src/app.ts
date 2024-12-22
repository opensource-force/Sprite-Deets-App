import { Image } from "./image/image.ts";
import { AppComponent } from "./components/app-component.ts";
import { AppState, Store } from "./component.ts";

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

const store = new Store(new AppState(), new AppComponent());
store.update();

if (document.readyState !== "loading") {
  init();
} else {
  self.addEventListener("DOMContentLoaded", init);
}
