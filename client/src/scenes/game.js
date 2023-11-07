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
    this.load.image("cloud", "src/assets/clouds.png");
    this.load.spritesheet("asteroid", "src/assets/asteroid.png", {
      frameWidth: 232,
      frameHeight: 125,
    });
    this.load.spritesheet("jet", "src/assets/jet.png", {
      frameWidth: 153,
      frameHeight: 98,
    });
    this.load.spritesheet("bird", "src/assets/bird.png", {
      frameWidth: 240,
      frameHeight: 314,
    });
    this.load.spritesheet("shuttle", "src/assets/shuttle.PNG", {
      frameWidth: 269, // Width of each frame
      frameHeight: 648, // Height of each frame
    });
  }

  create() {
    let numberOfShuttles = 1;
    let isGameOver = false;
    let gameOverText;
    let elapsedTime = 0; // Initialize the elapsed time
    let playerHit = null;
    let shuttle;

    this.bgCallback = () => {
      new Obstacle(this).createSprite(
        "background",
        200,
        400,
        1,
        null,
        null,
        0.8,
        0
      );
    };
    this.playerCallback = () => {
      const player = new Obstacle(this).createSprite(
        "player",
        200,
        450,
        0.05,
        null,
        null,
        1,
        1
      );
      this.physics.world.setBounds(0, 0, 400, 800);
      player.setSize(30, 30, true);
      player.setCollideWorldBounds(true);
      player.setInteractive();
      return player;
    };
    this.cloudCallback = () => {
      const randomY = Phaser.Math.Between(0, this.physics.world.bounds.height);
      new Obstacle(this).createSprite(
        "cloud",
        1400,
        randomY,
        0.4,
        -100,
        null,
        1,
        10
      );
    };
    this.birdCallback = () => {
      const randomY = Phaser.Math.Between(0, this.physics.world.bounds.height);
      const bird = new Obstacle(this).createSprite(
        "bird",
        500,
        randomY,
        0.4,
        -60,
        null,
        1,
        1
      );

      if (!this.anims.exists("bird")) {
        new Obstacle(this).createAnimation("bird", "bird", 0, 19, 20, -1);
      }
      bird.play("bird");

      this.physics.add.overlap(player, bird, () => {
        gameOverHandler();

        bird.destroy();
      });
    };

    this.jetCallback = () => {
      const randomY = Phaser.Math.Between(0, this.physics.world.bounds.height);
      const jet = new Obstacle(this).createSprite(
        "jet",
        0,
        randomY,
        0.7,
        500,
        null,
        1,
        1
      );

      jet.setFlip(true, false);

      if (!this.anims.exists("jet")) {
        new Obstacle(this).createAnimation("jet", "jet", 15, 18, 4, 0);
      }
      jet.play("jet");

      this.physics.add.overlap(player, jet, () => {
        gameOverHandler();

        jet.destroy();
      });
    };

    this.asteroidCallback = () => {
      const randomX = Phaser.Math.Between(0, this.physics.world.bounds.width);
      const asteroid = new Obstacle(this).createSprite(
        "asteroid",
        randomX,
        800,
        0.4,
        0,
        -10,
        1,
        1
      );

      if (!this.anims.exists("asteroid")) {
        new Obstacle(this).createAnimation(
          "asteroid",
          "asteroid",
          0,
          4,
          10,
          -1
        );
      }
      asteroid.play("asteroid");

      this.physics.add.overlap(player, asteroid, () => {
        gameOverHandler();
        asteroid.destroy();
      });
    };
    this.shuttleCallback = () => {
      for (let i = 0; i < numberOfShuttles; i++) {
        // Randomly select the X position within the game world bounds
        const randomX = Phaser.Math.Between(0, this.physics.world.bounds.width);
        shuttle = new Obstacle(this).createSprite(
          "shuttle",
          randomX,
          800,
          0.2,
          0,
          -300,
          1,
          2
        );

        // shuttle.setSize(50, 50, true);

        if (!this.anims.exists("shuttle")) {
          new Obstacle(this).createAnimation(
            "shuttle",
            "shuttle",
            0,
            5,
            10,
            -1
          );
        }
        shuttle.play("shuttle");

        this.physics.add.overlap(player, shuttle, () => {
          gameOverHandler();

          shuttle.destroy();
          console.log("destroyed");
        });
      }
    };

    const gameOverHandler = () => {
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
          // shuttle.destroy();

          // Destroy the player hit image
          playerHit.destroy();

          // Recreate the player
          player = this.playerCallback();

          this.scene.restart();
        });
      }
    };
    //Text element to display the timer
    const timerText = this.add.text(110, 20, "Score: 0", {
      fontFamily: "Gluten",
      fontSize: "40px",
      fill: "#ffffff",
    });
    timerText.setDepth(1);

    // Create a timer
    const timer = this.time.addEvent({
      delay: 1000, // 1 second
      repeat: -1, // 60 times (60 seconds)
      // callback: yourCallbackFunction, // The function to call each second
      callback: () => {
        elapsedTime++;
        timerText.setText(`Score: ${elapsedTime}`);

        if (elapsedTime >= 15 && elapsedTime % 10 === 0) {
          this.cloudCallback();
        }
        if (elapsedTime % 2 === 0) {
          this.shuttleCallback();
        }

        if (elapsedTime % 5 === 0) {
          this.birdCallback();
        }

        if (elapsedTime >= 70 && elapsedTime<100) {
          numberOfShuttles = 2;
        }
        if (elapsedTime >= 100) {
          numberOfShuttles = 3;
        }

        if (elapsedTime >= 17 && elapsedTime % 12 === 0) {
          this.asteroidCallback();
        }
        if (elapsedTime >= 50 && elapsedTime % 3 === 0) {
          this.jetCallback();
        }
      },
    });
    // if (elapsedTime % 4 === 0 && elapsedTime !== 0) {

    //   console.log(elapsedTime);
    //   this.birdCallback();
    // }

    //Add player image as "physics.add.sprite" to make the gravity/bounds work
    // const player = this.physics.add.sprite(200, 450, "player");
    this.bgCallback();
    let player = this.playerCallback();

    this.physics.world.setBounds(0, 0, 400, 800); // Set world bounds

    // Set up event listeners for mouse input
    // Set the offset to avoid the player being covered by touch/cursor
    const offset = { x: 0, y: -80 }; // Adjust the offset values as needed

    this.input.on("pointermove", (pointer) => {
      // Set the player's position to the cursor's position with an offset
      player.x = pointer.x + offset.x;
      player.y = pointer.y + offset.y;
    });

    // this.GameScreenHandler = new GameScreenHandler(this);
    // this.GameScreenHandler.buildUI();
  }

  update() {}
}
class Obstacle {
  constructor(scene) {
    this.scene = scene;
  }

  createSprite(givenSprite, x, y, scale, gravityX, gravityY, opacity, depth) {
    const sprite = this.scene.physics.add.sprite(x, y, givenSprite);
    sprite.setScale(scale);
    sprite.setGravityX(gravityX);
    sprite.setGravityY(gravityY);
    sprite.setAlpha(opacity);
    sprite.setDepth(depth);
    return sprite;
  }

  createAnimation(givenKey, givenSprite, start, end, frameRate, repeat) {
    this.scene.anims.create({
      key: givenKey,
      frames: this.scene.anims.generateFrameNumbers(givenSprite, {
        start: start,
        end: end,
      }),
      frameRate: frameRate,
      repeat: repeat,
    });

    // if (this.scene.anims.exists(givenKey)) {
    //   this.scene.anims.get(givenKey).destroy();
    // console.log("destroyed fly");
    // }
  }
}
