import GameScreenHandler from "../helpers/GameScreenHandler";

export default class Game extends Phaser.Scene {
  constructor() {
    super({
      key: "Game",
    });
  }
  preload() {
    this.load.image("background", "src/assets/background.png");
    this.load.image("player", "src/assets/player.png");
    this.load.image("playerHit", "src/assets/player-hit.png");
    this.load.spritesheet("shuttle", "src/assets/shuttle.PNG", {
      frameWidth: 269, // Width of each frame
      frameHeight: 648, // Height of each frame
    });
  }

  create() {
    // Add background image
    const bg = this.add.image(200, 400, "background");
    bg.setAlpha(0.8); // Changed opacity

    //Add player image as "physics.add.sprite" to make the gravity/bounds work
    // const player = this.physics.add.sprite(200, 450, "player");
    let player = this.createPlayer(200, 450);
    let playerHit = null;

    this.physics.world.setBounds(0, 0, 400, 800); // Set world bounds
    player.setCollideWorldBounds(true); // Enable collisions between the player and the world bounds
    player.setInteractive(); // Enable input for the player sprite

    // Set up event listeners for mouse input
    // Set the offset to avoid the player being covered by touch/cursor
    const offset = { x: 0, y: -50 }; // Adjust the offset values as needed

    this.input.on("pointermove", (pointer) => {
      // Set the player's position to the cursor's position with an offset
      player.x = pointer.x + offset.x;
      player.y = pointer.y + offset.y;
    });

    //Text element to display the timer
    const timerText = this.add.text(110, 20, "Score: 0", {
      fontFamily: "Gluten",
      fontSize: "40px",
      fill: "#ffffff",
    });

    let elapsedTime = 0; // Initialize the elapsed time
    let shuttle;
    let isGameOver = false;
    let gameOverText;

    // Create a timer
    const timer = this.time.addEvent({
      delay: 1000, // 1 second
      repeat: -1, // 60 times (60 seconds)
      // callback: yourCallbackFunction, // The function to call each second
      callback: () => {
        elapsedTime++;
        timerText.setText(`Score: ${elapsedTime}`);

        if (elapsedTime === 2) {
          this.shuttleCallback();
        }
      },
    });

    this.shuttleCallback = () => {
      // Add shuttle spritesheet
      shuttle = this.physics.add.sprite(340, 800, "shuttle");
      shuttle.setScale(0.2);
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

      this.physics.add.overlap(player, shuttle, () => {
        if (!isGameOver) {
          // Remove the original player image
          player.destroy();

          // Create a new image using player.hit asset at the same position
          playerHit = this.add.sprite(player.x, player.y, "playerHit");
          playerHit.setScale(0.05);

          // Set the game over flag
          isGameOver = true;

          // Stop the timer and display "Game Over"
          timer.remove();
          gameOverText = this.add.text(200, 200, "Game Over", {
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
          gameOverText.setOrigin(0.5);

          // Create a restart button
          const restartButton = this.add.text(200, 500, "Restart", {
            fontFamily: "Gluten",
            fontSize: "36px",
            color: "white",
            shadow: {
              offsetX: 4,
              offsetY: 4,
              blur: 4,
              stroke: false,
              fill: true,
            },
          });

          restartButton.setOrigin(0.5);
          restartButton.setInteractive();

          // Add pointerover and pointerout event listeners
          restartButton.on("pointerover", () => {
            restartButton.setShadow(6, 6, "rgba(0, 0, 0, 0.5)", false, true);
          });

          restartButton.on("pointerout", () => {
            restartButton.setShadow(4, 4, "rgba(0, 0, 0, 0.5)", false, true);
          });

          restartButton.on("pointerdown", () => {
            // Reset the game state
            isGameOver = false;
            elapsedTime = 0;
            timerText.setText(`Score: ${elapsedTime}`);
            gameOverText.setVisible(false);
            restartButton.setVisible(false);

            // Remove the shuttle sprite
            shuttle.destroy();

            // Destroy the player hit image
            playerHit.destroy();

            // Recreate the player
            player = this.createPlayer(200, 450);

            this.scene.restart();
          });
        }
      });
    };

    this.GameScreenHandler = new GameScreenHandler(this);
    this.GameScreenHandler.buildUI();
  }

  update() {}
  // Create a player sprite
  createPlayer(x, y) {
    const player = this.physics.add.sprite(x, y, "player");
    player.setScale(0.05);
    this.physics.world.setBounds(0, 0, 400, 800);
    player.setCollideWorldBounds(true);
    player.setInteractive();
    return player;
  }
}
