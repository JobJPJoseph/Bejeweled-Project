const Screen = require("./screen");
const Cursor = require("./cursor");

class Bejeweled {

  constructor() {

    this.playerTurn = "O";

    // Initialize this
    this.grid = [];

    this.cursor = new Cursor(8, 8);

    Screen.initialize(8, 8);
    Screen.setGridlines(true); // Was originally false

    this.cursor.setBackgroundColor();
    // Replace this with real commands
      // Make sure with each command we render

    // We need to add:
      // up command: w
      // down command: s
      // right command: a
      // left command: d
      // quit command: q Nope we can't overite it.
    Screen.addCommand('w', 'Move up', () => {
      this.cursor.up();
      Screen.render();
    });
    Screen.addCommand('s', 'Move down', () => {
      this.cursor.down();
      Screen.render();
    });
    Screen.addCommand('a', 'Move left', () => {
      this.cursor.left();
      Screen.render();
    });
    Screen.addCommand('d', 'Move right', () => {
      this.cursor.right();
      Screen.render();
    });

    let getInput = {};

    Screen.addCommand('g', "Get cursor", () => {
      getInput['position'] = this.cursor.cursorCurrentPosition(); // Is an Object
      getInput['char'] = Screen.grid[getInput.position.row][getInput.position.col];
      // console.log(input);
      // console.log(Screen.grid[input.row][input.col]);
      console.log('getInput: ', getInput)
    });

    Screen.addCommand('p', 'Place cursor', () => {

      if(Object.keys(getInput).length !== 0) {
        console.log('getting called');
        const placeInput = {};
        placeInput['position'] = this.cursor.cursorCurrentPosition(); // Is an Object
        placeInput['char'] = Screen.grid[placeInput.position.row][placeInput.position.col];


        // We now need to switch them.
        console.log(getInput.char);
        console.log(placeInput.char);

        console.log(placeInput.position.row, placeInput.position.col, getInput.char);
        console.log(getInput.position.row, getInput.position.col, placeInput.char.length);

        Screen.setGrid(placeInput.position.row, placeInput.position.col, getInput.char);
        Screen.setGrid(getInput.position.row, getInput.position.col, placeInput.char);
        getInput = {};
        Screen.render();
      } else {
        console.log('Choose an input first');
      }

    });

    Screen.render();
  }

  static checkForMatches(grid) {

    // Fill this in

  }

}

module.exports = Bejeweled;
