export default class MainScreenHandler {
  constructor(scene) {
    this.buildMainScreenText = () => {
      // scene.play = scene.add
      //   .text(570, 200, "PLAY")
      //   .setFontSize(50)
      //   .setFontFamily("Trebuchet MS")
      scene.play = scene.add.text(480, 440, "PLAY", {
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

      scene.play.setInteractive();

      scene.play.on("pointerdown", () => {
        scene.scene.start("Game");
      });

      scene.play.on("pointerover", () => {
        scene.play.setShadow(6, 6, "rgba(0,0,0,3.5)", 14, true, true);
      });

      scene.play.on("pointerout", () => {
        scene.play.setShadow(4, 4, "rgba(0,0,0,3.5)", 10, true, true);
      });

      scene.settings = scene.add.text(540, 560, "SETTINGS", {
        fontFamily: "Gluten",
        fontSize: "30px",
        stroke: "#ad4d42",
        strokeThickness: "5",
        shadow: {
          offsetX: 4,
          offsetY: 4,
          blur: 10,
          stroke: true,
          fill: true,
        },
      });

      scene.settings.setInteractive();

      scene.settings.on("pointerover", () => {
        scene.settings.setShadow(6, 6, "rgba(0,0,0,3.5)", 14, true, true);
      });

      scene.settings.on("pointerout", () => {
        scene.settings.setShadow(4, 4, "rgba(0,0,0,3.5)", 10, true, true);
      });

      scene.source = scene.add.text(1070, 20, "SOURCE", {
        fontFamily: "Gluten",
        fontSize: "22px",
        stroke: "#ad4d42",
        strokeThickness: "5",
        shadow: {
          offsetX: 1,
          offsetY: 1,
          blur: 1,
          stroke: true,
          fill: true,
        },
      });

      scene.source.setInteractive();

      scene.source.on("pointerover", () => {
        scene.source.setShadow(0, 8, "rgba(90,90,90,7.5)", 8, true, true);
      });

      scene.source.on("pointerout", () => {
        scene.source.setShadow(4, 4, "rgba(0,0,0,3.5)", 10, true, true);
      });
    };

    this.buildUI = () => {
      this.buildMainScreenText();
    };
  }
}