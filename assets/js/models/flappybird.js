class FlappyBird {

  constructor(ctx, x, y) {
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.jumpImpulse = 70;
    this.vy = 3;

    this.width = 0
    this.height = 0

    this.sprite = new Image();
    this.sprite.src = 'assets/img/bird.png';
    this.sprite.isReady = false

    this.isImpulsing = false
    
    // sprite setup
    this.sprite.horizontalFrames = 3
    this.sprite.verticalFrames = 1
    this.sprite.initHorizontalFrame = 0
    this.sprite.initVerticalFrame = 0
    this.drawCount = 0;
    this.movements = {
      up: false
    }
    this.sprite.onload = () => {
      this.sprite.isReady = true
      this.sprite.frameWidth = Math.floor(this.sprite.width / this.sprite.horizontalFrames)
      this.sprite.frameHeight = Math.floor(this.sprite.height / this.sprite.verticalFrames)
      this.width = this.sprite.frameWidth
      this.height = this.sprite.frameHeight
    }
  }

  onKeyEvent(event) {
    // iteration 2: configure frame animation
    const status = (event.type === 'keydown')
    if (event.keyCode === KEY_UP) {
      this.movements.up = status
      this.isImpulsing = true
    }
  }

  draw() {
    if (this.sprite.isReady) {
      // draw sprite
      this.ctx.drawImage(
        this.sprite,
        this.sprite.initHorizontalFrame * this.sprite.frameWidth,
        this.sprite.initVerticalFrame * this.sprite.frameHeight,
        this.sprite.frameWidth,
        this.sprite.frameHeight,
        this.x,
        this.y,
        this.width,
        this.height
      )
      this.drawCount++;
      // animate sprite
    }
    this.animate()
    if (this.y <= 0 || this.y + this.height >= this.ctx.canvas.height) {
      game.stop()
    }
  }

  animate() {
    // iteration 2: configure frame animation
    this.animateFrame();
  }

  animateFrame(initVerticalFrame, initHorizontalFrame, segments, frequency) {
    // iteration 2: animate the sprite
    if (this.drawCount < 10) {
    } else if (this.drawCount < 20) {
      this.sprite.initHorizontalFrame = 1
    } else if (this.drawCount < 30) {
      this.sprite.initHorizontalFrame = 2
    } else {
      this.sprite.initHorizontalFrame = 0
      this.drawCount = 0
    }
  }

  move() {
    // iteration 2: move the y
    if (this.movements.up && this.isImpulsing) {
      this.y += -this.jumpImpulse
      this.isImpulsing = false
      } else {
      this.y += this.vy
    }
  }

  collides(element) {
    // iteration 3: check collisions (true|false)
  }

}
