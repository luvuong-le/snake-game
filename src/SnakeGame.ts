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
                setTimeout(() => {
                    this.snakeBoard.snake.changingDirection = false;
                }, 100);
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
                if (this.snakeBoard.snake.collided) {
                    this.gameOver = true;
                    this.gameFinish();
                }
            }
        }, constants.SNAKE_SPEED);
    }

    start() {
        this.snakeBoard.init();
        this.init();
        this.addListeners();
    }
}

const game = new SnakeGame();

game.start();
