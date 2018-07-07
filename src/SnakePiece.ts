import constant from './constants';

export default class SnakePiece {
    width: number;
    height: number;
    x: number;
    y: number;

    constructor(x, y) {
        this.width = constant.SNAKE_PIECE_WIDTH;
        this.height = constant.SNAKE_PIECE_HEIGHT;
        this.x = x;
        this.y = y;
    }
}