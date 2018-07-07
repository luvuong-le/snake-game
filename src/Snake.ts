import constants from "./constants";

interface SnakeBody {
    x: number
    y: number
}

export default class Snake {

    body: Array<SnakeBody>

    constructor() {
        this.body = [
            { x: 580, y: 150 },
            { x: 130, y: 150 },
            { x: 110, y: 150 },
            { x: 90, y: 150 },
            { x: 70, y: 150 }
        ];
    }

    moveForward() {
        const head = {
            x: this.body[0].x + constants.SNAKE_PIECE_WIDTH,
            y: this.body[0].y
        };
        this.body.unshift(head);
        this.body.pop();
    }

    getXPosition() {
        return this.body[0].x + constants.SNAKE_PIECE_WIDTH;
    }

    getYPosition() {
        return this.body[0].y + constants.SNAKE_PIECE_HEIGHT;
    }
}