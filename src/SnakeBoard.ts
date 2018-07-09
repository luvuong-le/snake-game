import constants from './constants';
import { random, count, easeOut } from './util';
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
	previousScore: number;
	score: number;
	scoreElement: HTMLElement;
	board: SnakeBoardInterface;
	context: CanvasRenderingContext2D;
	boardInterval: any;
	food: Array<SnakeFood>;

	constructor () {
		this.scoreElement = <HTMLElement>document.getElementById("score"),
		this.gameboard = <HTMLCanvasElement> document.getElementById('gameboard');
		this.food = [];
		this.previousScore = 0;
		this.score = 0;
	}

	updateScore() {
		count(this.scoreElement, this.previousScore, this.score, 10, false);
	}
    
	createSnakePiece(x, y) {
		return new SnakePiece(x, y);
	}

	repaintElements() {
		this.clearCanvas();
		this.snake.body.forEach(snake => {
			this.drawSnakePiece(this.createSnakePiece(snake.x, snake.y), constants.SNAKE_COLOR);
		});
		this.food.forEach(food => {
			this.drawSnakePiece(food, constants.SNAKE_FOOD_COLOR);
		});
	}

	drawSnakePiece(snake, color) {
		this.context.fillStyle = color;
		this.context.strokeStyle = constants.STROKE_COLOR;
		this.context.fillRect(snake.x, snake.y, snake.width, snake.height);
    }
    
	clearCanvas() {
		this.context.clearRect(0, 0, this.gameboard.width, this.gameboard.height);
	}

	outOfBoardX() {
		return (this.isOutBoardLeft() || this.isOutBoardRight()) ? true : false;
	}

	checkBoundaries() {
		if (this.snake.getXPosition() >= this.board.XBoundary + constants.SNAKE_SIZE || this.snake.getXPosition() <= 0) {
			return true;
		}
		if (this.snake.getYPosition() >= this.board.YBoundary + constants.SNAKE_SIZE || this.snake.getYPosition() <= 0) {
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
		return (this.isOutBoardDown() || this.isOutBoardUp()) ? true : false;
	}

	isOutBoardDown() {
		return (this.snake.getYPosition() > this.board.YBoundary && this.snake.getYPosition() >= this.board.YBoundary + constants.SNAKE_PIECE_HEIGHT * this.snake.body.length) ? true : false;
	}

	isOutBoardUp() {
		return (this.snake.getYPosition() < 0 && this.snake.getYPosition() <= (0 - constants.SNAKE_PIECE_HEIGHT * this.snake.body.length)) ? true : false;
	}

	setGameContext() {
		this.scoreElement.textContent = "0";
        this.context = this.gameboard.getContext('2d');
        this.board = {
            XBoundary: this.gameboard.width,
            YBoundary: this.gameboard.height,
        }
	}

	checkFoodCollision() {
		return (this.snake.body[0].x === this.food[0].x && this.snake.body[0].y === this.food[0].y) ? true : false;
	}

	updateFoodPiece() {
		this.context.clearRect(this.food[0].x, this.food[0].y, constants.SNAKE_PIECE_WIDTH, constants.SNAKE_PIECE_WIDTH);
		this.snake.appendFood({ x: this.food[0].x, y: this.food[0].y });
		this.food = [];
		this.food.unshift(this.createSnakePiece(random(this.gameboard.width - constants.SNAKE_PIECE_WIDTH), random(this.gameboard.width - constants.SNAKE_PIECE_WIDTH)));
		clearInterval(this.boardInterval);
		this.previousScore = this.score;
		this.snake.speed -= constants.SPEED_DECREMENT;
		this.score += constants.SCORE_DECREMENT;
		this.updateScore();
		this.setBoardInterval();
	}

	setBoardInterval() {
		this.boardInterval = setInterval(() => {
			if (this.checkFoodCollision()) {
				this.updateFoodPiece();
			}
			if (this.outOfBoardX()) {
				this.snake.clearX();
				this.clearCanvas();
			}
			if (this.outOfBoardY()) {
				this.snake.clearY();
				this.clearCanvas();
			}
			this.repaintElements();
		}, this.snake.speed);	
	}

	createSnake() {
		this.snake = new Snake();
		this.snake.setMoveInterval(this.snake.moveForward.bind(this.snake));
		this.createSnakeFood();
		this.setBoardInterval();
	}

	createSnakeFood() {
		return this.food.unshift(this.createSnakePiece(random(this.gameboard.width - constants.SNAKE_PIECE_WIDTH), random(this.gameboard.width - constants.SNAKE_PIECE_WIDTH)));
	}

	init() {
		this.setGameContext();
		this.createSnake();
	}
}