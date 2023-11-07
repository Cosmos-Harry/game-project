import MainScreenHandler from "../helpers/MainScreenHandler";

export default class MainScreen extends Phaser.Scene {
  constructor() {
    super({
      key: "MainScreen",
    });
  }
  preload() {
    this.load.image("background", "src/assets/background.png");
    this.load.audio("main-menu", "src/assets/main-menu.mp3");
  }

  create() {
    // let music;

    // music = this.sound.add("menu-theme");
    // music.play();

    this.add.image(200, 400, "background");

    const play = this.add.text(135, 420, "PLAY", {
      fontFamily: "Gluten",
      fontSize: "50px",
      stroke: "#ad4d42",
      strokeThickness: "5",
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
      this.sound.play("main-menu", { loop: true });
    });

    play.on("pointerover", () => {
      play.setShadow(6, 6, "rgba(0,0,0,3.5)", 14, false, true);
    });

    play.on("pointerout", () => {
      play.setShadow(4, 4, "rgba(0,0,0,3.5)", 10, false, true);
    });

    const settings = this.add.text(165, 520, "SETTINGS", {
      fontFamily: "Gluten",
      fontSize: "15px",
      stroke: "#ad4d42",
      strokeThickness: "3",
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

    const source = this.add.text(320, 20, "SOURCE", {
      fontFamily: "Gluten",
      fontSize: "14px",
      stroke: "#ad4d42",
      strokeThickness: "2",
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

    // this.MainScreenHandler = new MainScreenHandler(this);
    // this.MainScreenHandler.buildUI();
  }

  update() {}
}
