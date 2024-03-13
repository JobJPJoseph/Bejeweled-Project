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

    Screen.render();
  }

  static checkForMatches(grid) {

    // Fill this in

  }

}

module.exports = Bejeweled;
