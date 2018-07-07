import Snake from './Snake';
import { expect } from 'chai';
import 'mocha';

describe('Class: Snake', () => {
    let snake = null;

    beforeEach("Creating New Snake", function(){
        snake = new Snake();
    });

    it ("should create a new snake object", () => {
        expect(snake).to.be.a('object');
    }); 

    it ("should add a new snake piece", () => {
        snake.body.unshift({
            x: 580,
            y: 170
        });

        expect(snake.body.length).to.be.equal(6);
    });

    it ("should move the snake forward", () => {
        snake.moveForward();

        expect(snake.body[0].x).to.be.equal(600);
    });

    it ("should return the x position of the snake", () => {
        expect(snake.getXPosition()).to.be.equal(600);
    });


    it ("should return the Y position of the snake", () => {
        expect(snake.getYPosition()).to.be.equal(170);
    })
});
