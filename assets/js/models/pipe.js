class Pipe {

  constructor(ctx, sX, sY, sHeight, x, y, height, mode) {
    this.ctx = ctx;
    this.sX = sX;
    this.sY = sY;
    this.sHeight = sHeight;
    this.x = x;
    this.vx = 3;
    this.y = y;
    this.height = height;
    this.mode = mode;

    this.img = new Image();
    // iteration 3: load the source checking the mode and setup this.with (must be the image with)
    
    if (this.mode === 'top') {
      this.img.src = './assets/img/pipe-top.png'
    } else {
      this.img.src = './assets/img/pipe-bottom.png'
    } 
    this.width = this.img.width

    this.img.isReady = false
    this.img.onload = () => {
      this.img.isReady = true
    }
  }

  draw() {
    if (this.img.isReady) {
      // iteration 3: draw the pipe don't worry if looks unscaled
      this.ctx.drawImage(
        this.img,
        this.sX,
        this.sY,
        this.img.width,
        this.sHeight,
        this.x,
        this.y,
        this.img.width,
        this.height,
      )
    }
  }

  move () {
    // iteration 3: move the pipe
    this.x -= this.vx
  }
}
