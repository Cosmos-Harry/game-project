import GameScreenHandler from "../helpers/GameScreenHandler";

export default class Game extends Phaser.Scene {
  constructor() {
    super({
      key: "Game",
    });
  }
  preload() {
    this.load.image("background", "/assets/background.png");
    this.load.image("player", "/assets/player.png");
    this.load.image("player-hit", "/assets/player-hit.png");
    this.load.spritesheet("shuttle", "/assets/shuttle.png", {
      frameWidth: 1300, // Width of each frame
      frameHeight: 3000, // Height of each frame
    });
  }

  create() {
    // Add background image
    const bg = this.add.image(620, 400, "background");
    bg.setAlpha(0.8); // Changed opacity

    //Add player image as "physics.add.sprite" to make the gravity/bounds work
    const player = this.physics.add.sprite(800, 150, "player");
    player.setScale(0.1); // Reduced the size of the player image
    this.physics.world.setBounds(0, 0, 1200, 800); // Set world bounds
    player.setCollideWorldBounds(true); // Enable collisions between the player and the world bounds
    player.setInteractive(); // Enable input for the player sprite
    this.input.on("pointermove", function (pointer) {
      player.x = pointer.x;
      player.y = pointer.y;
    }); // Set up event listeners for mouse input

    //Text element to display the timer
    const timerText = this.add.text(550, 20, "Score: 0", {
      fontFamily: "Gluten",
      fontSize: "40px",
      fill: "#ffffff",
    });

    let elapsedTime = 0; // Initialize the elapsed time

    // Create a timer
    const timer = this.time.addEvent({
      delay: 1000, // 1 second
      repeat: -1, // 60 times (60 seconds)
      // callback: yourCallbackFunction, // The function to call each second
      callback: () => {
        elapsedTime++;
        timerText.setText(`Score: ${elapsedTime}`);
        if (elapsedTime === 2) {
          this.shuttleCallback(elapsedTime);
        }
      },
      callbackScope: this,
    });

    let shuttle;
    let isGameOver = false;
    let gameOverText;

    this.shuttleCallback = () => {
      // Add shuttle spritesheet
      shuttle = this.physics.add.sprite(1100, 800, "shuttle");
      shuttle.setScale(0.08);
      shuttle.setGravityY(-300); // Set gravity of the shuttle
      // create animation of the shuttle spritesheet
      this.anims.create({
        key: "fly",
        frames: this.anims.generateFrameNumbers("shuttle", {
          start: 0,
          end: 5,
        }),
        frameRate: 10,
        repeat: -1,
      });
      shuttle.play("fly"); // play the animation
    };

    // Handle collisions
    this.physics.add.overlap(player, shuttle, () => {
      if (!isGameOver) {
        // Set the game over flag
        isGameOver = true;

        // Stop the timer and display "Game Over"
        timer.remove();
        gameOverText = this.add.text(400, 300, "Game Over", {
          fontFamily: "Gluten",
          fontSize: "48px",
          color: "#ff0000",
        });
        gameOverText.setOrigin(0.5);

        // Create a restart button
        const restartButton = this.add.text(620, 300, "Restart", {
          fontFamily: "Gluten",
          fontSize: "36px",
          color: "#00ff00",
        });
        restartButton.setOrigin(0.5);
        restartButton.setInteractive();

        restartButton.on("pointerdown", () => {
          // Reset the game state
          isGameOver = false;
          elapsedTime = 0;
          timerText.setText(`Score: ${elapsedTime}`);
          gameOverText.setVisible(false);

          // Remove the shuttle sprite
          shuttle.destroy();

          // Restart the game
          this.scene.restart();
        });
      }
    });

    this.GameScreenHandler = new GameScreenHandler(this);
    this.GameScreenHandler.buildUI();
  }

  update() {}
}
