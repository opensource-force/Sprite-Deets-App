import { Image } from './image/image.ts';
import { Toolbar } from './components.ts/toolbar.ts';
import { SpriteCanvas } from "./components.ts/sprite-canvas.ts";
import { Timeline } from "./components.ts/timeline.ts";
import { AppComponent } from "./components.ts/app-component.ts";

const init = async () => {
  // handle all your on load setup here
  const newImage = new Image('<put path here>', '<put name here>'); 
    // will be useful in the future
    // window.alert(`
    //   here is where you would implement image uploading, 
    //   which will give you a path, 
    //   which you use in the constructor of the image,
    //   which will have the name ${newImage.name}
    // `);
  };


  const app = document.getElementById('app');

  if (app) {
    app.appendChild(new AppComponent('', [
      new Toolbar('left', 'Toolbar').render(),
      new Toolbar('right', 'Toolbar').render(),
      new SpriteCanvas("Canvas").render(),
      new Timeline("Timeline").render(),
    ]).render());
  }

if(document.readyState !== 'loading') {
  init()
    .then(console.log);
} else {
  window.addEventListener("DOMContentLoaded", init);
}
