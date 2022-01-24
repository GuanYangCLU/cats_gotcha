import { Sprite } from "../base/Sprite.js";
import { DataStore } from "../base/DataStore.js";

export class Box extends Sprite {
  constructor(key) {
    const image = Sprite.getImage(key);
    super(
      image,
      0, 0,
      image.width, image.height,
      // (DataStore.getInstance().canvas.width - image.width) / 2, (DataStore.getInstance().canvas.height - image.height) / 2.5,
      20, 180,
      image.width / 2.5, image.height / 2.5
    );
    this.boxKey = key;
  }
}

// 50, 200, 1/3
// 20, 180, 1/2.5
