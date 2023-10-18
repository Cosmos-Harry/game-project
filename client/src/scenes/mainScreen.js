import MainScreenHandler from "../helpers/MainScreenHandler";

export default class MainScreen extends Phaser.Scene {
  constructor() {
    super({
      key: "MainScreen",
    });
  }
  preload() {
    this.load.image("background", "/assets/background.png");
  }

  create() {
    this.add.image(620, 400, "background");
    this.MainScreenHandler = new MainScreenHandler(this);
    this.MainScreenHandler.buildUI();
  }

  update() {}
}
