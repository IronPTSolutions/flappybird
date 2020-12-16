class Game {

  constructor(canvasId, onGameEnd) {
    this.canvas = document.getElementById(canvasId);
    this.canvas.width = 384;
    this.canvas.height = 498;
    this.ctx = this.canvas.getContext('2d');

    this.drawIntervalId = undefined;
    this.fps = 1000 / 60;

    // iteration 1: setup the backgound
    this.backgound = new Background(this.ctx)
    // iteration 2: setup the flappy
    this.bird = new FlappyBird(this.ctx, this.canvas.width / 4, this.canvas.height / 2)
    // iteration 2: setup the flappy

    this.pipes = [];
    this.drawPipesCount = 0;
    this.pipesFrequency = 100;

    // bonus: setup the score
    this.score = 0
    this.bestScore = 0;
    this.isCounting = false
    this.scoreIntervalId = undefined
    this.isStopped = false
  }

  onKeyEvent(event) {
    // iteration 2: link flappy key events
    this.bird.onKeyEvent(event)
    if (this.isStopped) {
      this.backgound.onKeyEvent(event)
    }
  }

  start() {
    // Iteration 1: each 60f clear - move - draw - [next iterations: addPipes - checkCollisions - checkScore]
    if (!window.localStorage.getItem('bestScore')) {
      this.bestScore = 0
    } else {
      this.bestScore = parseInt(window.localStorage.getItem('bestScore'))
    }
    
    this.drawIntervalId = setInterval(() => {
      this.isStopped = false
      this.clear()
      this.draw()
      this.checkCollisions()
      this.checkScore()
      this.move()
      this.drawPipesCount++

      if (this.drawPipesCount % this.pipesFrequency === 0) {
          this.addPipes()
          this.drawPipesCount = 0
        }

    }, this.fps)
  }

  stop() {
    // Iteration 1: stop the game
    this.isStopped = true
    this.isCounting = false
    clearInterval(this.drawIntervalId)
    clearInterval(this.scoreIntervalId)
    this.end()
  }

  restart() {
    // Bonus: restart on demand
    this.pipes = []
    this.score = 0
    this.bird.y = this.canvas.height / 2
    this.start()
  }

  end() {
    // Iteration 4: stop the game and setup score
    this.saveScore()
    this.ctx.save()
    this.ctx.fillStyle = 'rgba(0, 0, 0, 0.5)'
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)
    this.ctx.font = '26px FlappyFont'
    this.ctx.fillStyle = 'white'
    this.ctx.textAlign = 'center'
    this.ctx.fillText(
      'Game over!',
      this.canvas.width / 2,
      this.canvas.height / 3,
    )
    this.ctx.fillText(
      `Score: ${this.score}`,
      this.canvas.width / 2,
      this.canvas.height / 2,
    )
    this.ctx.fillText(
      `Press 'R' to restart`,
      this.canvas.width / 2,
      this.canvas.height * 2 / 3,
    )
    this.ctx.restore()
  }

  clear() {
    // Iteration 1: clean the screen
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)

    this.pipes = this.pipes.filter(pipe => pipe.x + pipe.width >= 0)
  }

  move() {
    // Iteration 1: move the background
    this.backgound.move()
    // Iteration 2: move the flappy
    this.bird.move()
    // Iteration 3: move the pipes
    this.pipes.forEach(pipe => pipe.move())
  }

  addPipes() {
    // Iteration 3: each draw pipes frequency cycles concat a pair of pipes to the pipes array and reset the draw cycle
    const minSpace = 2 * this.bird.height + this.bird.jumpImpulse
    const maxHeight = 0.75 * (this.canvas.height - 79)
    const minHeight = 30
    const bottomHeight = Math.floor(Math.random() * (maxHeight - minHeight) + minHeight)
    let topHeight = (this.canvas.height - 79) - bottomHeight - minSpace

    if (topHeight > 200) {
      topHeight = 200
    }

    this.pipes.push(
      new Pipe(
        this.ctx,
        0,
        200 - topHeight,
        topHeight,
        this.canvas.width, 
        0, 
        topHeight, 
        'top'),
      new Pipe(
        this.ctx,
        0,
        0,
        bottomHeight,
        this.canvas.width, 
        this.canvas.height - 79 - bottomHeight, 
        bottomHeight, 
        'bottom')
    )
  }

  randPairOfPipes() {
    // Iteration 3: return two new pipes inside an array. MIND THE GAP
  }

  checkCollisions() {
    // Iteration 4: check pipes collisions among flappy
    if (this.pipes.some(pipe => this.bird.collides(pipe))) {
      this.stop()
    }
  }

  checkScore() {
    // Bonus
    if (this.isCounting === false) {
      if (this.pipes.some(pipe => pipe.x < this.canvas.width / 4 - 20)) 
      {
          this.isCounting = true
          this.score = 1
          this.addScore()
      }
    }
  }

  addScore() {
    this.scoreIntervalId = setInterval(() => {
      this.score++
    }, this.fps * 100)
  }

  saveScore() {
    if (this.bestScore > this.score) {
    } 
    else {
      window.localStorage.setItem('bestScore',this.score)
    }
  }

  draw() {
    // Iteration 1: draw the background
    this.backgound.draw()
    // Iteration 2: draw the flappy
    this.bird.draw()
    // Iteration 2: draw the pipes
    this.pipes.forEach(pipe => pipe.draw())
    // Bonus: draw the score
    this.ctx.font = '26px FlappyFont'
    this.ctx.fillStyle = 'white'
    this.ctx.textAlign = 'center'
    this.ctx.fillText(
      `${this.score}`,
      30,
      40,
    )
    this.ctx.font = '26px FlappyFont'
    this.ctx.fillStyle = 'white'
    this.ctx.textAlign = 'center'
    this.ctx.fillText(
      `Best: ${this.bestScore}`,
      70,
      480,
    )
  }
}
