import { Image } from './image/image.ts';

console.log('hey there pardner');

const init = async () => {
  // handle all your on load setup here

  document.getElementById('upload-image').addEventListener('click', (evt) => { // <---- here evt is ignored, but 

  const newImage = new Image('<put path here>', '<put name here>'); 
                                                                               // will be useful in the future
    window.alert(`
      here is where you would implement image uploading, 
      which will give you a path, 
      which you use in the constructor of the image,
      which will have the name ${newImage.name}
    `);
  });
};

if(document.readyState !== 'loading') {
  init()
    .then(console.log);
} else {
  window.addEventListener("DOMContentLoaded", init);
}
