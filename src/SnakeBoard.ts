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
	boardInterval: any;
	context: CanvasRenderingContext2D;
	food: Array<SnakeFood>;

	constructor () {
		this.scoreElement = <HTMLElement>document.getElementById("score"),
		this.gameboard = <HTMLCanvasElement> document.getElementById('gameboard');
		this.food = [];
		this.boardInterval = null;
		this.previousScore = 0;
		this.score = 0;
	}

	updateScore() {
		this.previousScore = this.score;
		this.score += constants.SCORE_DECREMENT;
		count(this.scoreElement, this.previousScore, this.score, 10, false);
	}

	updateSpeed() {
		if (this.snake.speed > 25) {
			this.snake.speed -= constants.SPEED_DECREMENT;
		}
	}
    
	createSnakePiece(x, y) { return new SnakePiece(x, y); }

	createFoodPiece(food) { return new SnakePiece(food.x, food.y); }

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
		this.context.strokeRect(snake.x, snake.y, snake.width, snake.height);
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

	returnRandomXY() {
		const newFood = {
			x: random(this.gameboard.width - constants.SNAKE_PIECE_WIDTH),
			y: random(this.gameboard.width - constants.SNAKE_PIECE_WIDTH)
		} 

		return (!this.snake.checkExists(newFood)) ? newFood : this.returnRandomXY();
	}

	updateFoodPiece() {
		this.context.clearRect(this.food[0].x, this.food[0].y, constants.SNAKE_PIECE_WIDTH, constants.SNAKE_PIECE_WIDTH);
		this.repaintElements();
		this.snake.appendFood({ x: this.food[0].x, y: this.food[0].y });
		this.food = [];
		this.food.unshift(this.createFoodPiece(this.returnRandomXY()));
		clearInterval(this.boardInterval);
		this.updateSpeed();
		this.updateScore();
		this.updateBoard();
	}

	updateBoard() {
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
		this.snake.start();
		this.createSnakeFood();
		this.updateBoard();
	}

	createSnakeFood() {
		return this.food.unshift(this.createFoodPiece(this.returnRandomXY()));
	}

	init() {
		this.setGameContext();
		this.createSnake();
	}
}