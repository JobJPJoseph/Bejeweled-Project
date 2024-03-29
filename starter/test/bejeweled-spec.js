// const { expect } = require('chai');
const chai = require('chai');
const expect = chai.expect;
const spies = require('chai-spies');

chai.use(spies);

const Bejeweled = require("../class/bejeweled.js");
// const { randomFruit } = require('../class/screen.js');
// const Screen = require('../class/screen.js');


describe ('Bejeweled', function () {

  let Screen;

  beforeEach(function () {
    Screen = require('../class/screen.js');
    // Screen.createBoard(8, 8);
  });

  // Add tests for setting up a basic board
  describe('Screen.createBoard', function () {

    it('should call Screen.randomFruit', function () {
      const randomFruitSpy = chai.spy.on(Screen, 'randomFruit');

      Screen.createBoard(8, 8);

      expect(randomFruitSpy).to.have.been.called;

      chai.spy.restore(Screen, 'randomFruit');
    });

    it('should return a 2-D array where each index contains a fruit', function () {
      Screen.createBoard(8, 8);
      const grid = Screen.grid;

      for (let i = 0; i < grid.length; i++) {
        const row = grid[i];

        expect(row.every(elem => Screen.fruits.includes(elem))).to.be.true;
      }

    });

  });

  // Add tests for a valid swap that matches 3
    // This is saying after a swap, is there a streak

  describe('validSwap', function () {

    const grid1 = [ // has horizontal
      ["🥥", "🥝", "🥝","🥝","🍓","🍇","🍊","🍇"],
      ["🍓", "🥥", "🥥","🍓","🍓","🍇","🍇","🍊"],
      ["🥝", "🥝", "🍇","🍇","🥥","🥝","🥥","🥝"],
      ["🍇", "🥝", "🥥","🍓","🍓","🍇","🍇","🍊"]
    ];

    const grid2 = [ // no streak
      ["🥥", "🥝", "🍊","🥝","🍓","🍇","🍊","🍇"],
      ["🍓", "🍊", "🥥","🍓","🍓","🍇","🍇","🍊"],
      ["🥝", "🥝", "🥥","🍇","🥥","🥝","🥥","🥝"],
      ["🍇", "🥝", "🍊","🍓","🍓","🍇","🍇","🍊"]
    ]

    const grid3 = [ // vertical streak
      ["🥥", "🥝", "🥥","🥝","🍓","🍇","🍊","🍇"],
      ["🍓", "🥝", "🥥","🍓","🍓","🍇","🍇","🍊"],
      ["🥝", "🥝", "🍇","🍇","🥥","🥝","🥥","🥝"],
      ["🍇", "🍊", "🥥","🍓","🍓","🍇","🍇","🍊"]
    ]

    context('horizontal streaks', function () {

      it('should return a array of objects that represent coordinates of a found streak', function () {
        const actual = Screen.validSwap(grid1);

        const expected = [
          { row: 0, col: 1 },
          { row: 0, col: 2 },
          { row: 0, col: 3 }
        ];

        for (let i = 0; i < expected.length; i++) {
          expect(actual[i]).to.deep.equal(expected[i]);
        };

      });

      it('should return false that no horizontal streak was found', function () {
        expect(Screen.validSwap(grid2)).to.be.false;
      });

    });

    context('vertical streaks', function () {

      it('should return a array of objects that represent coordinates of a found streak', function () {
        const actual = Screen.validSwap(grid3);

        const expected = [
          { row: 0, col: 1 },
          { row: 1, col: 1 },
          { row: 2, col: 1 }
        ];

        for (let i = 0; i < expected.length; i++) {
          expect(actual[i]).to.deep.equal(expected[i]);
        };

      });

      it('should return false ther no vertical streak was found', function () {
        expect(Screen.validSwap(grid2)).to.be.false;
      });

    });

  });

  describe('replaceCoordinates', function () {

    const grid1 = [ // has horizontal
      ["🥥", "🥝", "🥝","🥝","🍓","🍇","🍊","🍇"],
      ["🍓", "🥥", "🥥","🍓","🍓","🍇","🍇","🍊"],
      ["🥝", "🥝", "🍇","🍇","🥥","🥝","🥥","🥝"],
      ["🍇", "🥝", "🥥","🍓","🍓","🍇","🍇","🍊"]
    ];

    it('should call Screen.randomFruit', function () {
      const randomFruitSpy = chai.spy.on(Screen, 'randomFruit');

      const coordinates = Screen.horizontalStreak(grid1);

      Screen.replaceCoordinates(grid1, coordinates);

      expect(randomFruitSpy).to.have.been.called;

      chai.spy.restore(Screen, 'randomFruit');
    });

  });

  // Add tests for swaps that set up combos
    // All this is saying is the callback called more the once.

  describe('combos', function () {

    const grid1 = [ // has horizontal
      ["🥥", "🥝", "🥝","🥝","🍓","🍇","🍊","🍇"],
      ["🍓", "🥥", "🥥","🍓","🍓","🍇","🍇","🍊"],
      ["🥝", "🥝", "🍇","🍇","🥥","🥝","🥥","🥝"],
      ["🍇", "🥝", "🥥","🍓","🍓","🍇","🍇","🍊"]
    ];

    context('Should continue to call validSwap untill it returns false', function () {

      it('should call Screen.validSwap', function () {
        const validSwapSpy = chai.spy.on(Screen, 'validSwap');

        Screen.combos(grid1);

        expect(validSwapSpy).to.have.been.called;
        chai.spy.restore(Screen, 'validSwap');
      });

    });

  });

  // Add tests to check if there are no possible valid moves
    // This would be Phase 7

  describe('noValidMoves', function () {

    const grid1 = [
      ["🥝", "🍓", "🥥", "🍇", "🍊"]
    ];

    const grid2 = [
      ["🥝", "🍓", "🥥", "🍇", "🍊"],
      ["🥝", "🍓", "🥥", "🍇", "🍊"]
    ];

    it('should return false when there is less the two of each fruit', function () {
      const actual = Screen.noValidMoves(grid1);
      expect(actual).to.be.false;
    });

    it('should return true when there is 2 or more of each fruit', function () {
      const actual = Screen.noValidMoves(grid2);
      expect(actual).to.be.true;
    });

  });

});
