// import Phaser from "phaser";
import MainScreen from "./scenes/mainScreen.js";
import Game from "./scenes/game.js";

const config = {
  type: Phaser.AUTO,
  scale: {
    mode: Phaser.Scale.RESIZE,
    parent:"game-container",
    width: "100%", 
    height: "100%",
    // width: 1200,
    // height: 800,
    // width: window.innerWidth, // for mobile
    // height: window.innerHeight, // for mobile 
  },
  scene: [MainScreen, Game],
  physics: {
    default: "arcade", // Set the default physics engine to 'arcade'
    arcade: {
    },
  },
};

const game = new Phaser.Game(config);
