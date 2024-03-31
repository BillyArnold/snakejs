class Board {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    this.context = this.canvas.getContext("2d");
    this.cellSize = 20;
    this.rows = 20;
    this.cols = 20;
    this.snakeBody = [];
    this.initialize();
  }

  initialize() {
    this.canvas.width = this.cellSize * this.cols;
    this.canvas.height = this.cellSize * this.rows;
    this.drawGrid();
  }

  setSnakeBody(snakeBody) {
    this.snakeBody = snakeBody;
  }
  drawGrid() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height); // clear the canvas
    for (let i = 0; i <= this.rows; i++) {
      this.context.moveTo(0, i * this.cellSize);
      this.context.lineTo(this.canvas.width, i * this.cellSize);
    }

    for (let j = 0; j <= this.cols; j++) {
      this.context.moveTo(j * this.cellSize, 0);
      this.context.lineTo(j * this.cellSize, this.canvas.height);
    }

    this.context.strokeStyle = "black";
    this.context.stroke();

    this.context.fillStyle = "green";
    this.snakeBody.forEach((segment) => {
      this.context.fillRect(
        segment.x * this.cellSize,
        segment.y * this.cellSize,
        this.cellSize,
        this.cellSize,
      );
    });
  }
}

//snake class
//generate a snake with length
//track length
//increase length using food collision
//check collisions
//move snake in current direction
//track current directions and change current directions using arrows

class Snake {
  constructor() {
    this.body = [{ x: 10, y: 10 }];
    this.direction = "right";
  }

  getBody() {
    return this.body;
  }

  getDirection() {
    return this.direction;
  }

  updateBody() {
    for (let i = 0; i < this.body.length; i++) {
      switch (this.direction) {
        case "right":
          this.body[i].x += 1;
          break;
        case "left":
          this.body[i].x -= 1;
          break;
        case "up":
          this.body[i].y -= 1;
          break;
        case "down":
          this.body[i].y += 1;
          break;
      }
    }
  }
}

//game class
class SnakeGame {
  constructor() {
    this.board = new Board("myCanvas");
    this.snake = new Snake();
    this.interval = setInterval(this.update.bind(this), 100);
    this.update();
  }

  update() {
    this.snake.updateBody();
    this.board.setSnakeBody(this.snake.getBody());
    this.board.drawGrid();
  }
}

new SnakeGame();

//food class
//generate random food item without colliding
