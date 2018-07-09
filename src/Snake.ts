import constants from "./constants";
interface SnakeBody {
    x: number
    y: number
}
export default class Snake {

    body: Array<SnakeBody>
    currentDirection: string
    moveInterval: any
    collided: boolean;
    changingDirection: boolean;
    food: Array<SnakeBody>;
    speed: number;

    constructor() {
        this.body = [{ x: 0, y: 160 }];
        this.currentDirection = constants.CURRENT_DIRECTION;
        this.moveInterval = null;
        this.collided = false;        
        this.changingDirection = false;
        this.food = [];
        this.speed = 85;
    }

    setMoveInterval(moveFunction) {
        this.moveInterval = setInterval(() => {
            moveFunction();
        }, this.speed);
    }

    checkCollision() {
        const collision = this.body.slice(1, this.body.length).some(snakePiece => {
			return this.body[0].x === snakePiece.x && this.body[0].y === snakePiece.y;
        });

        if (collision) {
            this.collided = true;
        }
    }

    appendFood(food) {
        this.body.unshift(food);
    }

    updateDirection(direction) {
        if (this.changingDirection) return;

        this.changingDirection = true;

        clearInterval(this.moveInterval);

        this.currentDirection = direction;

        switch (direction) {
            case constants.RIGHT:
				this.setMoveInterval(this.moveForward.bind(this));
				break;
			case constants.LEFT:
				this.setMoveInterval(this.moveBackward.bind(this));
				break;
            case constants.DOWN:
				this.setMoveInterval(this.moveForwardY.bind(this));
				break;
            case constants.UP:
				this.setMoveInterval(this.moveBackwardY.bind(this));
				break;
		}
    }

    incrementBody(head) {
        this.body.unshift(head);
		this.body.pop();
		this.checkCollision();
    }

    moveForward() {
        this.incrementBody({
            x: this.body[0].x + constants.SNAKE_PIECE_WIDTH,
            y: this.body[0].y
        });
    }

    moveBackward() {
        if (this.currentDirection !== constants.LEFT) {
            this.currentDirection = constants.LEFT;
            this.body.reverse();
        }
        this.incrementBody({
            x: this.body[0].x - constants.SNAKE_PIECE_WIDTH,
            y: this.body[0].y
        });
    }

    moveForwardY() {
        this.incrementBody({
            x: this.body[0].x,
            y: this.body[0].y + constants.SNAKE_PIECE_WIDTH
        });
    }

    moveBackwardY() {
        if (this.currentDirection !== constants.UP) {
			this.currentDirection = constants.UP;
			this.body.reverse();
		}
        this.incrementBody({
            x: this.body[0].x,
            y: this.body[0].y - constants.SNAKE_PIECE_WIDTH
        });
    }

    clearX() {
        return (this.currentDirection === constants.RIGHT) ? this.body.forEach((snake, i) => snake.x = 0 - (constants.SNAKE_SIZE * i)) : this.body.forEach((snake, i) => (snake.x = 600 + constants.SNAKE_SIZE * i));
    }

    clearY() {
        return this.currentDirection === constants.DOWN ? this.body.forEach((snake, i) => (snake.y = 0 - constants.SNAKE_SIZE * i)) : this.body.forEach((snake, i) => (snake.y = 600 + constants.SNAKE_SIZE * i));
    }

    getXPosition() {
        return (this.body[0].x + constants.SNAKE_PIECE_WIDTH);
    }

    getYPosition() {
        return (this.body[0].y + constants.SNAKE_PIECE_HEIGHT);
    }
}