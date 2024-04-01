class Board {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    this.context = this.canvas.getContext("2d");
    this.cellSize = 20;
    this.rows = 20;
    this.cols = 20;
    this.apple = null;
    this.snakeBody = [];
    this.initialize();
  }

  initialize() {
    this.canvas.width = this.cellSize * this.cols;
    this.canvas.height = this.cellSize * this.rows;
    this.drawGrid();
  }

  hasFoodCollision() {
    if (this.hasApple()) {
      for (let i = 0; i < this.snakeBody.length - 1; i++) {
        if (
          this.apple.x === this.snakeBody[i].x &&
          this.apple.y === this.snakeBody[i].y
        ) {
          return true;
        }
      }
    }
    return false;
  }

  getRows() {
    return this.rows;
  }

  setSnakeBody(snakeBody) {
    this.snakeBody = snakeBody;
  }

  setApple(apple) {
    this.apple = apple;
  }

  hasApple() {
    return this.apple !== null;
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

    if (this.hasApple()) {
      this.context.fillStyle = "red";
      this.context.fillRect(
        this.apple.x * this.cellSize,
        this.apple.y * this.cellSize,
        this.cellSize,
        this.cellSize,
      );
    }
  }
}

class Snake {
  constructor() {
    this.body = [
      { x: 10, y: 10 },
      { x: 11, y: 10 },
    ];
    this.direction = "right";
  }

  getBody() {
    return this.body;
  }

  getDirection() {
    return this.direction;
  }

  getHead() {
    return this.body[this.body.length - 1];
  }

  changeDirection(newDirection) {
    if (
      (this.direction === "up" && newDirection !== "down") ||
      (this.direction === "down" && newDirection !== "up") ||
      (this.direction === "left" && newDirection !== "right") ||
      (this.direction === "right" && newDirection !== "left")
    ) {
      this.direction = newDirection;
    }
  }

  updateBody() {
    switch (this.direction) {
      case "right":
        this.body.push({
          x: this.getHead().x + 1,
          y: this.getHead().y,
        });
        this.body.shift();
        break;
      case "left":
        this.body.push({
          x: this.getHead().x - 1,
          y: this.getHead().y,
        });
        this.body.shift();
        break;
      case "up":
        this.body.push({
          x: this.getHead().x,
          y: this.getHead().y - 1,
        });
        this.body.shift();
        break;
      case "down":
        this.body.push({
          x: this.getHead().x,
          y: this.getHead().y + 1,
        });
        this.body.shift();
        break;
    }
  }
}

class Apple {
  constructor(boardSize) {
    this.position = {
      x: Math.floor(Math.random() * (boardSize + 1)),
      y: Math.floor(Math.random() * (boardSize + 1)),
    };
  }

  getPosition() {
    return this.position;
  }
}

//game class
class SnakeGame {
  constructor() {
    this.board = new Board("myCanvas");
    this.snake = new Snake();
    this.interval = setInterval(this.update.bind(this), 100);
    this.bindEvents();
    this.update();
  }

  getScore() {
    return this.snake.getBody().length;
  }

  update() {
    this.snake.updateBody();
    this.board.setSnakeBody(this.snake.getBody());

    if (!this.board.hasApple()) {
      this.board.setApple(new Apple(this.board.getRows()).getPosition());
    }

    if (this.board.hasFoodCollision()) {
      this.board.setApple(null);
    }

    this.board.drawGrid();
  }

  bindEvents() {
    document.addEventListener("keydown", (event) => {
      this.handleKeyDown(event);
    });
  }

  handleKeyDown(event) {
    switch (event.key) {
      case "ArrowUp":
        this.snake.changeDirection("up");
        break;
      case "ArrowDown":
        this.snake.changeDirection("down");
        break;
      case "ArrowLeft":
        this.snake.changeDirection("left");
        break;
      case "ArrowRight":
        this.snake.changeDirection("right");
        break;
    }
  }
}

new SnakeGame();

//food class
//generate random food item without colliding
