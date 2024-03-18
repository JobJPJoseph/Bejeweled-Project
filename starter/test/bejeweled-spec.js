// const { expect } = require('chai');
const chai = require('chai');
const expect = chai.expect;
const spies = require('chai-spies');

chai.use(spies);

const Bejeweled = require("../class/bejeweled.js");
// const Screen = require('../class/screen.js');

describe('Screen', function () {

  let Screen;

  beforeEach(function () {
    Screen = require('../class/screen.js');
    Screen.initialize(8, 8);
  });

  it('should have a static property call fruits that is a type of array', function () {
    expect(Screen.fruits).to.exist;
    expect(Screen.fruits.length).to.equal(5);

    const actual = Screen.fruits;
    const expected = ["🥝", "🍓", "🥥", "🍇", "🍊"];

    for (let i = 0; i < expected.length; i++) {
      expect(expected).to.be.include(actual[i]);
    }

  });

  describe('randomFruit', function () {

    it('should call Math.random', function () {
      const randomSpy = chai.spy.on(Math, 'random');

      Screen.randomFruit();

      expect(randomSpy).to.have.been.called;
    });

    it('should return a random fruit from Screen.fruits', function () {
      const actual = Screen.randomFruit();
      const expected = ["🥝", "🍓", "🥥", "🍇", "🍊"];

      expect(expected).to.be.include(actual);
    });

  });

  describe('Initialize', function () {

    context('Screen.grid', function () {

      it('should return true for every index in Screen.grid is included in Screen.fruits', function () {
        const grid = Screen.grid;
        const expected = ["🥝", "🍓", "🥥", "🍇", "🍊"];

        console.log(grid);
        for (let i = 0; i < grid.length; i++) {
          const row = grid[i];

          expect(row.every(elem => expected.includes(elem))).to.equal(true);
        }

        // false positive
      });

    });

  });

});


describe ('Bejeweled', function () {

  // Add tests for setting up a basic board
  // let bejeweled;

  // it('should successfully create the Bejeweled class', function () {
  //   expect(Bejeweled).to.exist;
  // });

  // beforeEach(function () {
  //   const Screen = require('../class/screen.js');
  //   // bejeweled = new Bejeweled();
  // });

  // Add tests for a valid swap that matches 3

  // Add tests for swaps that set up combos

  // Add tests to check if there are no possible valid moves

});
