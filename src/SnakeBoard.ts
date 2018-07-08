import constants from './constants';
import { random } from './util';
import SnakePiece from './SnakePiece';
import Snake from './Snake';

interface SnakeBoardInterface {
	gameboard?: HTMLCanvasElement,
	XBoundary: number,
	YBoundary: number,
}

interface SnakeFood {
	x: number;
	y: number;
}

export default class SnakeBoard {
	
	gameboard: HTMLCanvasElement;
	snake: Snake;
	board: SnakeBoardInterface;
	context: CanvasRenderingContext2D;
	boardInterval: any;
	foodEaten: boolean;
	food: Array<SnakeFood>;

	constructor () {
		this.gameboard = <HTMLCanvasElement> document.getElementById('gameboard');
		this.food = [];
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

	drawFoodPiece() {
		this.food.forEach(food => {
			this.drawSnakePiece(food);
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

	outOfBoardX() {
		if (this.isOutBoardLeft() || this.isOutBoardRight()) {
			return true;
		}
		return false;
	}

	checkBoundaries() {
		if (this.snake.getXPosition() > this.board.XBoundary || this.snake.getXPosition() < 0) {
			return true;
		}
		if (this.snake.getYPosition() > this.board.YBoundary || this.snake.getYPosition() < 0) {
			return true;
		}
		return false;
	}

	isOutBoardRight() {
		return (this.snake.getXPosition() > this.board.XBoundary && this.snake.getXPosition() >= this.board.XBoundary + (constants.SNAKE_PIECE_WIDTH * this.snake.body.length)) ? true : false;
	}

	isOutBoardLeft() {
		return (this.snake.getXPosition() < 0 && this.snake.getXPosition() <= (0 - constants.SNAKE_PIECE_WIDTH * this.snake.body.length)) ? true : false;
	}

	outOfBoardY() {
		if (this.isOutBoardDown() || this.isOutBoardUp()) {
			return true;
		}
		return false;
	}

	isOutBoardDown() {
		return (this.snake.getYPosition() > this.board.YBoundary && this.snake.getYPosition() >= this.board.YBoundary + constants.SNAKE_PIECE_HEIGHT * this.snake.body.length) ? true : false;
	}

	isOutBoardUp() {
		return (this.snake.getYPosition() < 0 && this.snake.getYPosition() <= (0 - constants.SNAKE_PIECE_HEIGHT * this.snake.body.length)) ? true : false;
	}

	setGameContext() {
        this.context = this.gameboard.getContext('2d');
        this.board = {
            XBoundary: this.gameboard.width,
            YBoundary: this.gameboard.height,
        }
	}

	createSnake() {
		this.snake = new Snake();
		this.snake.start();
		this.createSnakeFood();
		this.boardInterval = setInterval(() => {
			if (this.outOfBoardX()) {
				this.snake.clearX();
				this.clearCanvas();
			}
			if (this.outOfBoardY()) {
				this.snake.clearY();
				this.clearCanvas();			
			}
			this.drawSnake();
			this.drawFoodPiece();
		}, constants.SNAKE_SPEED);	
	}

	createSnakeFood() {
		this.food.unshift(this.createSnakePiece(random(this.gameboard.width - constants.SNAKE_PIECE_WIDTH), random(this.gameboard.width - constants.SNAKE_PIECE_WIDTH)));
		this.drawFoodPiece();
	}

	init() {
		this.setGameContext();
		this.createSnake();
	}
}