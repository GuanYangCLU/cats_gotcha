import { Sprite } from "../base/Sprite.js";
// import { DataStore } from "../base/DataStore.js";

export class OuterButton extends Sprite {
  constructor() {
    const image = Sprite.getImage('button_outer');
    super(image,
      0, 0,
      image.width, image.height,
      210, 460,
      image.width / 2.8, image.height / 2.8
      // DataStore.getInstance().canvas.width, DataStore.getInstance().canvas.height
    );
  }
}
