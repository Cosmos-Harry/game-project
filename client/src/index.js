// import Phaser from "phaser";
import MainScreen from "./scenes/mainScreen.js";
import Game from "./scenes/game.js";

const config = {
  type: Phaser.AUTO,
  scale: {
    mode: Phaser.Scale.FIT,
    // width: 1200,
    // height: 800,
    width: window.innerWidth, // for mobile
    height: window.innerHeight, // for mobile 
  },
  scene: [MainScreen, Game],
  physics: {
    default: "arcade", // Set the default physics engine to 'arcade'
    arcade: {
    },
  },
};

const game = new Phaser.Game(config);
