// 导演类，控制游戏的逻辑
// 统管所有的逻辑运行、创建、销毁
import { DataStore } from "./base/DataStore.js";
import { BOX_KEYS } from "./lib/enums.js";

// 单例模式
export class Director {
  static getInstance() {
    if (!Director.instance) {
      Director.instance = new Director();
    }
    return Director.instance;
  }

  constructor() {
    this.dataStore = DataStore.getInstance();
    this.moveSpeed = 2;
    this.curBoxKeysCounterMap = BOX_KEYS.reduce((accum, key) => ({ ...accum, [key]: 0 }), {});
  }

  buttonEvent() {
    // for (let i = 0; i <= 2; i++) {
    //   this.dataStore.get('birds').y[i] = this.dataStore.get('birds').birdsY[i];
    // }
    // // 如果不把time置0 重力加速度运动计算就没有重置时间 会显示小鸟持续掉落 (time越来越大)
    // this.dataStore.get('birds').time = 0;

    this.shouldButtonRotate = true;
  }

  // check() {
  //   const boxes = this.dataStore.get('boxes');
  //
  //   if (boxes && boxes.length) {
  //     this.isGameOver = true;
  //     return;
  //   }
  // }

  getRandomBoxKey() {
    // 3次不要抽到同样的
    const availableBoxKeys = Object.entries(this.curBoxKeysCounterMap).filter(([key, count]) => count < 2);
    const index = Math.floor(Math.random() * availableBoxKeys.length);
    // console.log(index);
    const resKey = availableBoxKeys[index][0];
    this.curBoxKeysCounterMap = Object.entries(this.curBoxKeysCounterMap).map(([key, count]) => {
      return key === resKey ? [key, count + 1] : [key, 0]
    }).reduce((accum, [key, count]) => ({ ...accum, [key]: count }), {});
    return resKey;
  };

  run() {
    // this.check();
    // console.log('a', this.dataStore.get('boxes'));
    if (!this.isGameOver) {
      this.dataStore.get('background').draw();
      this.dataStore.get('button_outer').draw();
      if (this.shouldButtonRotate) {
        this.dataStore.get('button_inner').rotate();
        if (this.dataStore.get('button_inner').time >= 90) {
          this.dataStore.get('button_inner').time = 0;
          this.shouldButtonRotate = false;
          this.isGameOver = true;
        }
      } else {
        this.dataStore.get('button_inner').draw(
          undefined,
          undefined,
          undefined,
          undefined,
          undefined,
          250,
          460
        );
      }

      // 考虑浏览器性能的按时操作 在每一次浏览器刷新之前执行 效率远远高于setTimeout和setInterval
      let timer = requestAnimationFrame(() => this.run());
      this.dataStore.put('timer', timer);
    } else {
      // console.log('b', this.dataStore.get('box01'), this.dataStore.get('box02'), this.dataStore.get('box03'), '>>>');
      this.dataStore.get('background_dark').draw();

      const boxKey = this.getRandomBoxKey();
      this.dataStore.get(boxKey).draw();
      cancelAnimationFrame(this.dataStore.get('timer'));
      this.dataStore.destroy();
      // wx.triggerGC();
    }
  }
}
