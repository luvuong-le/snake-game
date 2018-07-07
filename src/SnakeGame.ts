import SnakeBoard from './SnakeBoard';
import '../src/scss/main.scss';


class SnakeGame {

    snakeBoard: SnakeBoard;
    score: number;

    constructor () {
        this.snakeBoard = new SnakeBoard();
    }

    start() {
        this.snakeBoard.init();
    }
}

const game = new SnakeGame();

game.start();
