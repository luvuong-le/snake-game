import SnakePiece from './SnakePiece';
import constant from './constants';
import { expect } from 'chai';
import 'mocha';

describe("Class: Snake Piece", () => {
    describe('Snake Piece Creation', () => {
        let snakePiece = new SnakePiece(150, 150);

        it("Should return correct x", () => {
            expect(snakePiece.x).to.be.equal(150);
        });

        it('Should return correct y', () => {
			expect(snakePiece.y).to.be.equal(150);
        });

        it('Should return correct width', () => {
			expect(snakePiece.width).to.be.equal(constant.SNAKE_PIECE_WIDTH);
        });

        it('Should return correct height', () => {
			expect(snakePiece.height).to.be.equal(constant.SNAKE_PIECE_HEIGHT);
		});
    });
})
