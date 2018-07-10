import constants from "./constants";
interface SnakeBody {
    x: number
    y: number
}
export default class Snake {

    body: Array<SnakeBody>
    food: Array<SnakeBody>;
    currentDirection: string
    moveInterval: any
    collided: boolean;
    changingDirection: boolean;
    speed: number;
    dx: number;
    dy: number;

    constructor() {
        this.body = [{ x: 20, y: 160 }, { x: 0, y: 160 }];
        this.food = [];
        this.currentDirection = constants.CURRENT_DIRECTION;
        this.moveInterval = null;
        this.collided = false;        
        this.changingDirection = false;
        this.speed = 85;
        this.dx = 20;
        this.dy = 0;
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

    checkExists(food) {
        return this.body.some(snakePiece => {
            return food.x === snakePiece.x && food.y === snakePiece.y;
        });
    }

    appendFood(food) {
        this.body.unshift(food);
    }

    updateDirection(direction) {
        this.currentDirection = direction;

        clearInterval(this.moveInterval);
        
        this.setMoveInterval(this.move.bind(this));
    }

    incrementBody(head) {
        this.body.unshift(head);
		this.body.pop();
		this.checkCollision();
    }

    move() {
        this.incrementBody({
            x: this.body[0].x + this.dx,
            y: this.body[0].y + this.dy
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