import constants from "./constants";

interface SnakeBody {
    x: number
    y: number
}
interface SnakeFood {
    x: number;
    y: number;
}
export default class Snake {

    body: Array<SnakeBody>
    currentDirection: string
    moveInterval: any
    collided: boolean;
    changingDirection: boolean;
    food: Array<SnakeFood>;
    speed: number;

    constructor() {
        this.body = [
            { x: 20, y: 160 },
            { x: 0, y: 160 }
        ];

        this.currentDirection = constants.CURRENT_DIRECTION;
        this.collided = false;
        this.changingDirection = false;
        this.speed = 80;
    }

    start() {
        this.moveInterval = setInterval(() => {
            this.moveForward();
        }, this.speed);
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
        const foodPiece = {
            x: food.x,
            y: food.y
        }
        this.body.unshift(foodPiece);
    }

    updateDirection(direction) {
        if (this.changingDirection) return;

        this.changingDirection = true;

        clearInterval(this.moveInterval);
        this.currentDirection = direction;

        switch (direction) {
            case "RIGHT":
                this.setMoveInterval(this.moveForward.bind(this));
                break;
            case "LEFT":
                this.setMoveInterval(this.moveBackward.bind(this));
                break;
            case "DOWN":
                this.setMoveInterval(this.moveForwardY.bind(this));
                break;
            case "UP":
                this.setMoveInterval(this.moveBackwardY.bind(this));
                break;
        }
    }

    moveForward() {
        const head = {
            x: this.body[0].x + constants.SNAKE_PIECE_WIDTH,
            y: this.body[0].y
        };
        this.body.unshift(head);
        this.body.pop();
        this.checkCollision();
    }

    moveBackward() {
        if (this.currentDirection !== "LEFT") {
            this.currentDirection = "LEFT";
            this.body.reverse();
        }
        const head = {
            x: this.body[0].x - constants.SNAKE_PIECE_WIDTH,
            y: this.body[0].y
        };
        this.body.unshift(head);
        this.body.pop();
        this.checkCollision();
    }

    moveForwardY() {
        const head = {
            x: this.body[0].x,
            y: this.body[0].y + constants.SNAKE_PIECE_WIDTH
        };
        this.body.unshift(head);
        this.body.pop();
        this.checkCollision();
    }

    moveBackwardY() {
        if (this.currentDirection !== "UP") {
            this.currentDirection = "UP";
            this.body.reverse();
        }
        const head = {
            x: this.body[0].x,
            y: this.body[0].y - constants.SNAKE_PIECE_WIDTH
        };
        this.body.unshift(head);
        this.body.pop();
        this.checkCollision();
    }

    clearX() {
        if (this.currentDirection === "RIGHT") {
            // this.body.forEach((snake) => snake.x = 0);
            for (let i = 0; i < this.body.length; i++) {
                this.body[0].x = 0 - (20 * i);
            }
        }

        if (this.currentDirection === "LEFT") {
            // this.body.forEach(snake => snake.x = 600);
            for (let i = 0; i < this.body.length; i++) {
                this.body[0].x = 600 + (20 * i);
            } 
        }
    }

    clearY() {
        if (this.currentDirection === "DOWN") {
            // this.body.forEach((snake) => snake.y = 0);
            for (let i = 0; i < this.body.length; i++) {
                this.body[0].y = 0 - (20 * i);
            }
        }

        if (this.currentDirection === "UP") {
            // this.body.forEach(snake => snake.y = 600);
            for (let i = 0; i < this.body.length; i++) {
                this.body[0].y = 600 + (20 * i);
            }
        }
    }

    getXPosition() {
        return (this.body[0].x + constants.SNAKE_PIECE_WIDTH);
    }

    getYPosition() {
        return (this.body[0].y + constants.SNAKE_PIECE_HEIGHT);
    }
}