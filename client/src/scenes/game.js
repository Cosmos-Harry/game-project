import GameScreenHandler from "../helpers/GameScreenHandler";

export default class Game extends Phaser.Scene {
  constructor() {
    super({
      key: "Game",
    });

    this.timer = null;
    this.player = null;
    this.lastPlayerPosition = { x: 0, y: 0 };
  }
  preload() {
    this.load.image("background", "src/assets/background.png");
    this.load.image("player", "src/assets/player.png");
    this.load.image("playerHit", "src/assets/player-hit.png");
    this.load.image("cloud", "src/assets/clouds.png");
    this.load.spritesheet("asteroid", "src/assets/asteroid.png", {
      frameWidth: 232,
      frameHeight: 136,
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
    let isGameOver = false;

    let numberOfShuttles = 1;
    let gameOverText;
    let elapsedTime = 0; // Initialize the elapsed time
    let playerHit = null;
    let shuttle;
    let bird;
    let jet;
    let asteroid;
    let asteroidShowerEnd = false;

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
      this.player = new Obstacle(this).createSprite(
        "player",
        200,
        450,
        0.06,
        null,
        null,
        1,
        1
      );
      this.physics.world.setBounds(0, 0, 400, 800);
      this.player.setSize(30, 30, true);
      this.player.setCollideWorldBounds(true);
      this.player.setInteractive();
      return this.player;
    };
    this.cloudCallback = () => {
      const randomY = Phaser.Math.Between(0, this.physics.world.bounds.height);
      const cloud = new Obstacle(this).createSprite(
        "cloud",
        900,
        randomY,
        0.4,
        -100,
        null,
        1,
        10
      );
      cloud.setScale(1.5);
    };
    this.birdCallback = () => {
      const randomY = Phaser.Math.Between(0, this.physics.world.bounds.height);
      bird = new Obstacle(this).createSprite(
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

      this.physics.add.overlap(this.player, bird, () => {
        gameOverHandler();

        bird.destroy();
      });
    };

    this.jetCallback = () => {
      const randomY = Phaser.Math.Between(0, this.physics.world.bounds.height);
      jet = new Obstacle(this).createSprite(
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

      this.physics.add.overlap(this.player, jet, () => {
        gameOverHandler();

        jet.destroy();
      });
    };

    this.asteroidCallback = () => {
      const randomX = Phaser.Math.Between(0, this.physics.world.bounds.width);
      asteroid = new Obstacle(this).createSprite(
        "asteroid",
        randomX,
        800,
        0.4,
        0,
        -10,
        1,
        1
      );

      asteroid.setAngle(90);

      if (!this.anims.exists("asteroid")) {
        new Obstacle(this).createAnimation("asteroid", "asteroid", 0, 4, 2, -1);
      }
      asteroid.play("asteroid");

      this.physics.add.overlap(this.player, asteroid, () => {
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

        this.physics.add.overlap(this.player, shuttle, () => {
          gameOverHandler();

          shuttle.destroy();
        });
      }
    };

    const gameOverHandler = () => {
      if (!isGameOver) {
        // Remove the original player image
        this.player.destroy();

        // Create a new image using player.hit asset at the same position
        playerHit = this.add.sprite(this.player.x, this.player.y, "playerHit");
        playerHit.setScale(0.07);

        // Set the game over flag
        isGameOver = true;

        // Stop the timer and display "Game Over"
        this.timer.remove();
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

          // Destroy the player hit image
          playerHit.destroy();

          // Recreate the player
          this.player = this.playerCallback();

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
    this.timer = this.time.addEvent({
      delay: 1000, // 1 second
      repeat: -1, // 60 times (60 seconds)
      callback: () => {
        elapsedTime++;
        timerText.setText(`Score: ${elapsedTime}`);

        if (elapsedTime >= 1 && elapsedTime % 5 === 0) {
          this.cloudCallback();
        }
        if (elapsedTime % 2 === 0 && asteroidShowerEnd === false) {
          this.shuttleCallback();
        }

        if (elapsedTime % 5 === 0 && asteroidShowerEnd === false) {
          this.birdCallback();
        }

        if (elapsedTime >= 70 && elapsedTime < 100) {
          numberOfShuttles = 2;
        }
        if (elapsedTime >= 100) {
          numberOfShuttles = 3;
        }

        if (elapsedTime >= 14 && elapsedTime % 7 === 0) {
          this.asteroidCallback();
        }
        if (
          elapsedTime >= 50 &&
          elapsedTime % 3 === 0 &&
          asteroidShowerEnd === false
        ) {
          this.jetCallback();
        }

        if (elapsedTime >= 30 && elapsedTime < 62) {
          asteroidShowerEnd = true;
        } else {
          asteroidShowerEnd = false;
        }

        if (elapsedTime >= 30 && elapsedTime < 50) {
          if (shuttle) {
            shuttle.destroy();
          }
          if (bird) {
            bird.destroy();
          }
          if (jet) {
            jet.destroy();
          }
          if (elapsedTime % 1 === 0) {
            this.asteroidCallback();
          }

          const asteroidAlert = this.add.text(200, 100, "ASTEROID SHOWER", {
            fontFamily: "Gluten",
            fontSize: "36px",
            color: "#ff0000",
            stroke: "#ffffff",
            strokeThickness: 4,
          });

          // Set origin to center the text
          asteroidAlert.setOrigin(0.5);

          // Define the tween configuration
          const tweenConfig = {
            targets: asteroidAlert,
            duration: 500, // Duration of the tween in milliseconds
            scaleX: 1.0, // Scale factor in the x-axis
            scaleY: 1.2, // Scale factor in the y-axis
            alpha: 0, // Transparency, 0 means fully transparent
            yoyo: true, // Yoyo effect (reverses the tween)
            repeat: 10, // Repeat indefinitely
            ease: "Linear", // Easing function, 'Linear' for constant speed
            onComplete: function (tween) {
              asteroidAlert.destroy();
            },
          };

          // Create the tween
          this.tweens.add(tweenConfig);
        }
      },
    });
    this.bgCallback();
    this.player = this.playerCallback();
    this.physics.world.setBounds(0, 0, 400, 800); // Set world bounds

    // const offset = { x: 0, y: 0 }; // Adjust the offset values as needed
    this.input.on("pointerup", (pointer) => {
      if (!isGameOver && elapsedTime >= 1) {
        this.timer.paused = true;
        this.lastPlayerPosition = { x: this.player.x, y: this.player.y };
        this.scene.sendToBack("Game");
        this.scene.pause("Game");
        this.scene.launch("Pause");
      }
    });

    this.input.on("pointermove", (pointer) => {
      if (!this.timer.paused && !isGameOver) {
        const deltaX = pointer.x - this.lastPlayerPosition.x;
        const deltaY = pointer.y - this.lastPlayerPosition.y;

        this.player.x += deltaX;
        this.player.y += deltaY;

        // Update the last pointer position
        this.lastPlayerPosition = { x: pointer.x, y: pointer.y };
      }
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
  }
}
