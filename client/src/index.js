// import Phaser from "phaser";
import MainScreen from "./scenes/mainScreen.js";
import Game from "./scenes/game.js";
import Pause from "./scenes/pause.js";

const config = {
  type: Phaser.AUTO,
  scale: {
    mode: Phaser.Scale.FIT,
    parent: "game-container",
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: 400,
    height: 800,
    // width: window.innerWidth*window.devicePixelRatio,
    // height: window.innerHeight*window.devicePixelRatio,
  },
  scene: [MainScreen, Game, Pause],
  physics: {
    default: "arcade", // Set the default physics engine to 'arcade'
    arcade: {},
  },
};


const game = new Phaser.Game(config);
