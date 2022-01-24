import { Sprite } from "../base/Sprite.js";
// import { DataStore } from "../base/DataStore.js";

export class InnerButton extends Sprite {
  constructor() {
    const image = Sprite.getImage('button_inner');
    image.style.transform = 'rotate(40deg)';

    super(image,
      0, 0,
      image.width, image.height,
      210, 460,
      image.width / 2.8, image.height / 2.8
      // DataStore.getInstance().canvas.width, DataStore.getInstance().canvas.height
    );
    this.time = 0;
  }
  rotate() {
    // 不是按钮转 而是类似按钮不动画布转 转完截图再恢复
    // 特别逻辑 值得注意
    // https://www.codenong.com/cs110529972/

    this.ctx.save();//保存状态
    this.ctx.translate(280, 530);//设置画布上的(0,0)位置，也就是旋转的中心点
    this.ctx.rotate(this.time * Math.PI / 90);
    // 缩放
    this.ctx.scale(0.35, 0.35);
    // this.ctx.drawImage(this.img, -this.img.width / 2, -this.img.height / 2);//把图片绘制在旋转的中心点，
    this.draw(
      this.img,
      this.srcX,
      this.srcY,
      this.srcW,
      this.srcH,
      -this.img.width / 2,
      -this.img.height / 2,
      this.img.width,
      this.img.height,
    );
    this.ctx.restore();//恢复状态
    // 控制只转一圈
    if (this.time < 90){
      this.time++;
    }
  }
}
