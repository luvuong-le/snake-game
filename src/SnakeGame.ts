import constants from './constants';
import SnakeBoard from './SnakeBoard';
import '../src/scss/main.scss';

class SnakeGame {

    snakeBoard: SnakeBoard;
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
                if (this.snakeBoard.snake.changingDirection) return;

                this.snakeBoard.snake.changingDirection = true;

                switch (e.keyCode) {
                    case constants.RIGHT_KEY:
                        if (this.snakeBoard.snake.currentDirection === constants.UP || this.snakeBoard.snake.currentDirection === constants.DOWN) {
                            this.snakeBoard.snake.dx = constants.SNAKE_SIZE;
                            this.snakeBoard.snake.dy = 0;
                            this.snakeBoard.snake.updateDirection(constants.RIGHT);
                        }
                        break;
                    case constants.LEFT_KEY:
                        if (this.snakeBoard.snake.currentDirection === constants.UP || this.snakeBoard.snake.currentDirection === constants.DOWN) {
							this.snakeBoard.snake.dx = -constants.SNAKE_SIZE;
							this.snakeBoard.snake.dy = 0;
							this.snakeBoard.snake.updateDirection(constants.LEFT);
						}
                        break;
                    case constants.DOWN_KEY:
                        if (this.snakeBoard.snake.currentDirection === constants.LEFT || this.snakeBoard.snake.currentDirection === constants.RIGHT) {
							this.snakeBoard.snake.dx = 0;
							this.snakeBoard.snake.dy = constants.SNAKE_SIZE;
							this.snakeBoard.snake.updateDirection(constants.DOWN);
						}
                        break;
                    case constants.UP_KEY:
                        if (this.snakeBoard.snake.currentDirection === constants.LEFT || this.snakeBoard.snake.currentDirection === constants.RIGHT) {
							this.snakeBoard.snake.dx = 0;
							this.snakeBoard.snake.dy = -constants.SNAKE_SIZE;
							this.snakeBoard.snake.updateDirection(constants.UP);
						}
                        break;
                }
            }
        });

        window.addEventListener('keyup', e => this.keyPressed = false);
    }

    gameFinish() {
        clearInterval(this.snakeBoard.boardInterval);
        clearInterval(this.snakeBoard.snake.moveInterval);
        alert('Game Over, Refresh to play again');
    }

    init() {
        if (!this.snakeBoard.checkBoundaries()) {
            if (this.snakeBoard.snake.collided) {
                this.gameOver = true;
            }

            if (this.gameOver) {
                return this.gameFinish();
            }
        }
        setTimeout(() => {
			this.snakeBoard.snake.changingDirection = false;
			this.init();
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
