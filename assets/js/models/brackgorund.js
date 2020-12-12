class Background {

  constructor(ctx) {
    this.ctx = ctx;

    this.vx = -1
   
    this.bgX = 0
    this.bgY = 0
    this.bgWidth = this.ctx.canvas.width
    this.bgHeight = this.ctx.canvas.height

    this.footerX = 0
    this.footerY = this.ctx.canvas.height - 79
    this.footerWidth = this.ctx.canvas.width
    this.footerHeight = 79

    this.bgImg = new Image();
    this.bgImg.src = 'assets/img/game-bg.png';

    this.footerImg = new Image();
    this.footerImg.src = 'assets/img/game-bg-footer.png';

    this.bgImg.isReady = false
    this.footerImg.isReady = false

    this.bgImg.onload = () => {
      this.bgImg.isReady = true
    }

    this.footerImg.onload = () => {
      this.footerImg.isReady = true
    }
  }

  draw() {
    if (this.bgImg.isReady && this.footerImg.isReady) {
      // draw both images
      this.ctx.drawImage(
        this.bgImg,
        this.bgX,
        this.bgY,
        this.bgWidth,
        this.bgHeight
      )
      this.ctx.drawImage(
        this.bgImg,
        this.bgX + this.ctx.canvas.width -1,
        this.bgY,
        this.bgWidth,
        this.bgHeight
      )
      this.ctx.drawImage(
        this.footerImg,
        this.footerX,
        this.footerY,
        this.footerWidth,
        this.footerHeight
      )

      if (this.bgX + this.bgWidth === 0) {
        this.bgX = 0
      }
    }
  }

  move() {
    // move the ground
    this.bgX += this.vx
    // check bounds
  }
}
