import constants from './constants';
import SnakeBoard from './SnakeBoard';
import '../src/scss/main.scss';

class SnakeGame {

    snakeBoard: SnakeBoard;
    score: number;
    gameOver: boolean;
    gameTracker: any;
    keyPressed: boolean;

    constructor () {
        this.snakeBoard = new SnakeBoard();
        this.gameOver = false;
        this.gameTracker = null;
        this.keyPressed = false;
    }

    addListeners() {
        window.addEventListener("keydown", (e) => {
            if (this.keyPressed) return; 

            this.keyPressed = true; 

            if (!this.snakeBoard.checkBoundaries()) {
                setTimeout(() => {
                    this.snakeBoard.snake.changingDirection = false;
                }, 80);
                switch (e.keyCode) {
                    case constants.RIGHT_KEY:
                        if (this.snakeBoard.snake.currentDirection !== constants.LEFT) {
                            this.snakeBoard.snake.updateDirection(constants.RIGHT);
                        }
                        break;
                    case constants.LEFT_KEY:
                        if (this.snakeBoard.snake.currentDirection !== constants.RIGHT) {
                            this.snakeBoard.snake.updateDirection(constants.LEFT);
						}
                        break;
                    case constants.DOWN_KEY:
                        if (this.snakeBoard.snake.currentDirection !== constants.UP) {
                            this.snakeBoard.snake.updateDirection(constants.DOWN);
                        }
                        break;
                    case constants.UP_KEY:
                        if (this.snakeBoard.snake.currentDirection !== constants.DOWN) {
                            this.snakeBoard.snake.updateDirection(constants.UP);
                        }
                        break;
                }
            }
        });

        window.addEventListener('keyup', () => {
            this.keyPressed = false;
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
        }, this.snakeBoard.snake.speed);
    }

    start() {
        this.snakeBoard.init();
        this.init();
        this.addListeners();
    }
}

const game = new SnakeGame();

game.start();
