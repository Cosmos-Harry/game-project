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

    const play = this.add.text(60, 400, "PLAY", {
      fontFamily: "Gluten",
      fontSize: "100px",
      stroke: "#ad4d42",
      strokeThickness: "10",
      shadow: {
        offsetX: 4,
        offsetY: 4,
        blur: 10,
        stroke: true,
        fill: true,
      },
    });

    play.setInteractive();

    play.on("pointerdown", () => {
      this.scene.start("Game");
    });

    play.on("pointerover", () => {
      play.setShadow(6, 6, "rgba(0,0,0,3.5)", 14, true, true);
    });

    play.on("pointerout", () => {
      play.setShadow(4, 4, "rgba(0,0,0,3.5)", 10, true, true);
    });

    const settings = this.add.text(120, 520, "SETTINGS  ", {
      fontFamily: "Gluten",
      fontSize: "30px",
      stroke: "#ad4d42",
      strokeThickness: "10",
      shadow: {
        offsetX: 4,
        offsetY: 4,
        blur: 10,
        stroke: true,
        fill: true,
      },
    });

    settings.setInteractive();

    settings.on("pointerover", () => {
      settings.setShadow(6, 6, "rgba(0,0,0,3.5)", 14, true, true);
    });

    settings.on("pointerout", () => {
      settings.setShadow(4, 4, "rgba(0,0,0,3.5)", 10, true, true);
    });

    const source = this.add.text(290, 20, "SOURCE", {
      fontFamily: "Gluten",
      fontSize: "22px",
      stroke: "#ad4d42",
      strokeThickness: "4",
      shadow: {
        offsetX: 4,
        offsetY: 4,
        blur: 4,
        stroke: true,
        fill: true,
      },
    });

    source.setInteractive();

    source.on("pointerover", () => {
      source.setShadow(6, 6, "rgba(0,0,0,3.5)", 8, true, true);
    });

    source.on("pointerout", () => {
      source.setShadow(4, 4, "rgba(0,0,0,3.5)", 4, true, true);
    });

    this.MainScreenHandler = new MainScreenHandler(this);
    this.MainScreenHandler.buildUI();
  }

  update() {}
}
