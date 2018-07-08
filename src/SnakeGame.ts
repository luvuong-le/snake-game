import constants from './constants';
import SnakeBoard from './SnakeBoard';
import '../src/scss/main.scss';

class SnakeGame {

    snakeBoard: SnakeBoard;
    score: number;
    gameOver: boolean;
    gameTracker: any;

    constructor () {
        this.snakeBoard = new SnakeBoard();
        this.gameOver = false;
        this.gameTracker = null;
    }

    addListeners() {
        window.addEventListener("keydown", (e) => {
            if (!this.snakeBoard.checkBoundaries()) {
                switch (e.keyCode) {
                    case constants.RIGHT_KEY:
                        if (this.snakeBoard.snake.currentDirection !== "LEFT") {
                            this.snakeBoard.snake.updateDirection("RIGHT");
                        }
                        break;
                    case constants.LEFT_KEY:
                        if (this.snakeBoard.snake.currentDirection !== "RIGHT") {
                            this.snakeBoard.snake.updateDirection("LEFT");
                        }
                        break;
                    case constants.DOWN_KEY:
                        if (this.snakeBoard.snake.currentDirection !== "UP") {
                            this.snakeBoard.snake.updateDirection("DOWN");
                        }
                        break;
                    case constants.UP_KEY:
                        if (this.snakeBoard.snake.currentDirection !== "DOWN") {
                            this.snakeBoard.snake.updateDirection("UP");
                        }
                        break;
                }
            }
        });
    }

    gameFinish() {
        clearInterval(this.snakeBoard.boardInterval);
        clearInterval(this.snakeBoard.snake.moveInterval);
        clearInterval(this.gameTracker);
    }

    init() {
        this.gameTracker = setInterval(() => {
            if (!this.snakeBoard.checkBoundaries()) {
                if (this.snakeBoard.snake.checkCollision()) {
                    this.gameOver = true;
                }

                if (this.gameOver) {
                    this.gameFinish();
                }

            }
        }, constants.SNAKE_SPEED);
    }

    start() {
        this.init();
        this.snakeBoard.init();
        this.addListeners();
    }
}

const game = new SnakeGame();

game.start();
