import MainScreenHandler from "../helpers/MainScreenHandler";

export default class MainScreen extends Phaser.Scene {
  constructor() {
    super({
      key: "MainScreen",
    });
  }
  preload() {
    this.load.image("background", "src/assets/background.png");
  }

  create() {
    this.add.image(200, 400, "background");

    const play = this.add.text(120, 400, "PLAY", {
      fontFamily: "Gluten",
      fontSize: "60px",
      stroke: "#ad4d42",
      strokeThickness: "10",
      shadow: {
        offsetX: 4,
        offsetY: 4,
        blur: 10,
        stroke: false,
        fill: true,
      },
    });

    play.setInteractive();

    play.on("pointerdown", () => {
      this.scene.start("Game");
    });

    play.on("pointerover", () => {
      play.setShadow(6, 6, "rgba(0,0,0,3.5)", 14, false, true);
    });

    play.on("pointerout", () => {
      play.setShadow(4, 4, "rgba(0,0,0,3.5)", 10, false, true);
    });

    const settings = this.add.text(155, 500, "SETTINGS", {
      fontFamily: "Gluten",
      fontSize: "18px",
      stroke: "#ad4d42",
      strokeThickness: "7",
      shadow: {
        offsetX: 4,
        offsetY: 4,
        blur: 7,
        stroke: false,
        fill: true,
      },
    });

    settings.setInteractive();

    settings.on("pointerover", () => {
      settings.setShadow(6, 6, "rgba(0,0,0,3.5)", 10, false, true);
    });

    settings.on("pointerout", () => {
      settings.setShadow(4, 4, "rgba(0,0,0,3.5)", 7, false, true);
    });

    const source = this.add.text(310, 20, "SOURCE", {
      fontFamily: "Gluten",
      fontSize: "16px",
      stroke: "#ad4d42",
      strokeThickness: "4",
      shadow: {
        offsetX: 4,
        offsetY: 4,
        blur: 4,
        stroke: false,
        fill: true,
      },
    });

    source.setInteractive();

    source.on("pointerover", () => {
      source.setShadow(6, 6, "rgba(0,0,0,3.5)", 7, false, true);
    });

    source.on("pointerout", () => {
      source.setShadow(4, 4, "rgba(0,0,0,3.5)", 4, false, true);
    });

    this.MainScreenHandler = new MainScreenHandler(this);
    this.MainScreenHandler.buildUI();
  }

  update() {}
}
