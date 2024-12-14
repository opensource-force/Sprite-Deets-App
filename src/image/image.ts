export class Image {
  name: string;

  constructor(path: string, name: string) {
    // load image from path, and add to the dom
    // see Hell's example code

    this.name = name;
  }

  get pixels(): Array<number> {
    // get image's pixels from the main canvas
  }

  set pixels(newPixels: Array<number>) {
    // set image's pixels on the main canvas
  }

  // etc
};
