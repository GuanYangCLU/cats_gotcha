// 初始化整个游戏的精灵，做为游戏开始的入口
import { ResourceLoader } from "./js/base/ResourceLoader.js";
import { DataStore } from "./js/base/DataStore.js";
import { BackGround } from "./js/runtime/BackGround.js";
import { BackGroundDark } from "./js/runtime/BackGroundDark.js";
import { Director } from "./js/Director.js";
import { OuterButton } from "./js/runtime/OuterButton.js";
import { InnerButton } from "./js/player/InnerButton.js";
import { Box } from "./js/player/Box.js";
import { BOX_KEYS } from "./js/lib/enums.js";

export class Main {
  constructor() {
    // when move to mini-game devtools, remove index.html and change canvas load to:
    // this.canvas = wx.createCanvas();
    this.canvas = document.getElementById('game_canvas');
    this.ctx = this.canvas.getContext('2d');
    this.dataStore = DataStore.getInstance();
    this.director = Director.getInstance();
    this.createBackgroundMusic();
    // call factory method
    const loader = ResourceLoader.create();
    loader.onLoaded(map => this.onResourceFirstLoaded(map));
  }

  onResourceFirstLoaded(map) {
    this.dataStore.canvas = this.canvas;
    this.dataStore.ctx = this.ctx;
    this.dataStore.res = map;
    this.init();
  }

  createBackgroundMusic() {
    // const bgm = new Audio();
    // const iframeNode = new HTMLIFrameElement();
    // iframeNode.style.display = 'none';
    // iframeNode.allow = 'autoplay';
    // iframeNode.src = 'audios/iframeBgm.m4a';
    // iframeNode.onload = () => {
    //   bgm.autoplay = true;
    //   bgm.loop = true;
    //   bgm.src = 'audios/bgm.mp3';
    //   bgm.onload = () => {
    //     bgm.play();
    //   };
    //   bgm.play();
    // };
    const audioDom = document.getElementById('audioDom');
    audioDom.play();

    // const iframeDom = document.getElementById('iframeDom');
    //
    // iframeDom.onload = function(){
    //   audioDom.src = 'audios/bgm.mp3';
    //   audioDom.oncanplay = function(){
    //     audioDom.play();
    //   };
    // };

    // const audioElement = document.createElement('audio');
    // audioElement.setAttribute('src', 'Mogwai2009-04-29_acidjack_t16.ogg');
    // audioDom.addEventListener("load", function() {
    //   audioDom.play();
    // });
    // audioDom.load();

  }

  init() {
    this.director.isGameOver = false;
    this.dataStore
      .put('background', BackGround)
      .put('background_dark', BackGroundDark)
      .put('button_outer', OuterButton)
      .put('button_inner', InnerButton)
      .putBoxes(BOX_KEYS, Box)
    ;
    this.registerEvent();
    this.director.run();
  }

  registerEvent() {
    // Web Dev Use Commented api
    this.canvas.addEventListener('touchstart', e => {
      // 屏蔽js原来的事件冒泡
      e.preventDefault();
      if (this.director.isGameOver) {
        this.init();
      } else {
        this.director.buttonEvent();
      }
    });
    // Wechat Mini Game use this api
    // wx.onTouchStart(() => {
    //   if (this.director.isGameOver) {
    //     this.init();
    //   } else {
    //     this.director.birdsEvent();
    //   }
    // });
  }
}
