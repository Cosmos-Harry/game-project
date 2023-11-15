export default class Pause extends Phaser.Scene {
  constructor() {
    super({
      key: "Pause",
    });
  }
  preload() {}

  create() {
    const pauseText = this.add.text(200, 400, "Pause", {
      fontFamily: "Gluten",
      fontSize: "60px",
      color: "#ff0000",
      shadow: {
        offsetX: 4,
        offsetY: 4,
        blur: 10,
        stroke: false,
        fill: true,
      },
    });
    pauseText.setOrigin(0.5);
    const gameScene = this.scene.get("Game");

    this.input.on("pointerdown", (pointer) => {
      gameScene.lastPlayerPosition = { x: pointer.x, y: pointer.y };
      pauseText.setVisible(false);
      this.scene.resume("Game");
      gameScene.timer.paused = false;
      this.scene.stop();
    });
  }

  update() {}
}
