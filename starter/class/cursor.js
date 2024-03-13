const Screen = require("./screen");

class Cursor {

  constructor(numRows, numCols) {
    this.numRows = numRows;
    this.numCols = numCols;

    this.row = 0;
    this.col = 0;

    this.gridColor = 'black';
    this.cursorColor = 'yellow';

  }

  cursorCurrentPosition() {
    // return [this.row, this.col];
    return { row: this.row, col: this.col };
  }

  resetBackgroundColor() {
    Screen.setBackgroundColor(this.row, this.col, this.gridColor);
  }

  setBackgroundColor() {
    Screen.setBackgroundColor(this.row, this.col, this.cursorColor);
  }

  up() {
    // Move cursor up

    if((this.row - 1) >= 0) {
      this.resetBackgroundColor();
      this.row--;
      this.setBackgroundColor();
    } // if not, do nothing

  }

  down() {
    // Move cursor down

    if((this.row + 1) < this.numRows) {
      this.resetBackgroundColor();
      this.row++;
      this.setBackgroundColor();
    } // if not, do nothing

  }

  left() {
    // Move cursor left

    if ((this.col - 1) >= 0) {
      this.resetBackgroundColor()
      this.col--;
      this.setBackgroundColor();
    }

  }

  right() {
    // Move cursor right

    if ((this.col + 1) < this.numCols) {
      this.resetBackgroundColor()
      this.col++;
      this.setBackgroundColor();
    }

  }

}


module.exports = Cursor;
