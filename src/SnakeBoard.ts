import constants from './constants';
import SnakePiece from './SnakePiece';
import Snake from './Snake';

interface SnakeBoardInterface {
	gameboard?: HTMLCanvasElement,
	XBoundary: number,
	YBoundary: number,
}

export default class SnakeBoard {
	// Going Right x +20
	// Going Left x -20

	// Goin up y - 20
	// Going Down y + 20

	gameboard: HTMLCanvasElement;
	snake: Snake;
	board: SnakeBoardInterface;
	context: CanvasRenderingContext2D;

	constructor () {
		this.gameboard = <HTMLCanvasElement> document.getElementById('gameboard');
	}
    
	createSnakePiece(x, y) {
		return new SnakePiece(x, y);
	}

	drawSnake() {
		this.clearCanvas();
		this.snake.body.forEach(snake => {
			this.drawSnakePiece(this.createSnakePiece(snake.x, snake.y));
		});
	}

	drawSnakePiece(snake) {
		this.context.fillStyle = constants.SNAKE_COLOR;
		this.context.strokeStyle = constants.STROKE_COLOR;
		this.context.fillRect(snake.x, snake.y, snake.width, snake.height);
		this.context.strokeRect(snake.x, snake.y, snake.width, snake.height);
    }
    
	clearCanvas() {
		this.context.clearRect(0, 0, this.gameboard.width, this.gameboard.height);
	}

	checkBoundaries() {
		if (this.snake.getXPosition() >= this.board.XBoundary ||
			this.snake.getYPosition() >= this.board.YBoundary) {
			return true;
		}
		return false;
	}

	setGameContext() {
        this.context = this.gameboard.getContext('2d');
        this.board = {
            XBoundary: this.gameboard.width - constants.SNAKE_PIECE_WIDTH,
            YBoundary: this.gameboard.height - constants.SNAKE_PIECE_HEIGHT,
        }
	}

	createSnake() {
		this.snake = new Snake();
		setInterval(() => {
			//this.snake.moveForward();
			this.drawSnake();
		}, constants.SNAKE_SPEED);
	}

	init() {
		this.setGameContext();
		this.createSnake();
	}
}