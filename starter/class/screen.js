const keypress = require('keypress');
const Command = require('./command');

class Screen {

  static numCols = 0;
  static numRows = 0;
  static grid = [];

  static fruits = ["🥝", "🍓", "🥥", "🍇", "🍊"];

  static borderChar = " ";
  static spacerCount = 1;

  static gridLines = false;

  static defaultTextColor = '\x1b[37m';  // White
  static defaultBackgroundColor = '\x1b[40m';  // Black

  static textColors = [];
  static backgroundColors = [];

  static message = "";

  static commands = {};

  static keypressCallback = null;

  static initialized = false;

  /*
  We are going to refactor the initilize so that it follows the SRP
  and also make it easier to test pieces of code.
  */

  static initialize(numRows, numCols) {
    // Screen.numRows = numRows;
    // Screen.numCols = numCols;

    // Screen.grid = [];
    // Screen.textColors = [];
    // Screen.backgroundColors = [];

    // // Sets the grid itself and the text and background colors
    // for (let row = 0 ; row < numRows ; row++) {
    //   // Screen.grid.push(new Array(numCols).fill(" ")); // We need tp make adjustments to this
    //   // Screen.grid.push(new Array(numCols).fill(Screen.randomFruit()));

    //   Screen.grid.push(new Array(numCols));

    //   for (let col = 0; col < numCols; col++) {
    //     Screen.grid[row][col] = Screen.randomFruit();
    //   }

    //   Screen.textColors.push(new Array(numCols).fill(Screen.defaultTextColor));
    //   Screen.backgroundColors.push(new Array(numCols).fill(Screen.defaultBackgroundColor));
    // }

    Screen.createBoard(numRows, numCols);

    // sets and pushes the quit command into Screen.commands
    Screen.setQuitMessage("\nThank you for playing! \nGoodbye.\n");
    const quitCmd = new Command('q', 'quit the game', Screen.quit);
    Screen.commands['q'] = quitCmd;

    // An alternative to making a while true
    Screen.initialized = true;

    Screen.waitForInput();
  }

  // added Method
  static createBoard(numRows, numCols) {
    Screen.numRows = numRows;
    Screen.numCols = numCols;

    Screen.grid = [];
    Screen.textColors = [];
    Screen.backgroundColors = [];

    // Sets the grid itself and the text and background colors
    for (let row = 0 ; row < numRows ; row++) {
      // Screen.grid.push(new Array(numCols).fill(" ")); // We need tp make adjustments to this
      // Screen.grid.push(new Array(numCols).fill(Screen.randomFruit()));

      Screen.grid.push(new Array(numCols));

      for (let col = 0; col < numCols; col++) {
        Screen.grid[row][col] = Screen.randomFruit();
      }

      Screen.textColors.push(new Array(numCols).fill(Screen.defaultTextColor));
      Screen.backgroundColors.push(new Array(numCols).fill(Screen.defaultBackgroundColor));
    }

  }

  // added Method
  static randomFruit() {
    const index = Math.floor(Math.random() * Screen.fruits.length);
    return Screen.fruits[index];
  }

  // added Method
  static validSwap(grid) {
    if (Screen.horizontalStreak(grid)) return true;
    if (Screen.verticalStreak(grid)) return true;
    return false;
  }

  // added Method
  static horizontalStreak(grid) {

    // Lets try this a different way!
    let streak = [];
    let character = grid[0][0];

    for (let i = 0; i < grid.length; i++) {
      let row = grid[i];

      for (let k = 0; k < row.length; k++) {
        let char = row[k];

        if (char === character) {
          streak.push({ row: i, col: k });
        } else {
          character = char;
          streak = [
            { row: i, col: k }
          ];
        }

        if (streak.length === 3) return streak;
      }

      streak = []; // covers the changing of rows edge case
    }

    return false;
  }

  // added Method
  static verticalStreak(grid) {
    // Lets try this a different way!
    let streak = [];
    let character = grid[0][0];

    for (let i = 0; i < grid[0].length; i++) {

      for (let k = 0; k < grid.length; k++) {
        let char = grid[k][i];

        if (char === character) {
          streak.push({ row: k, col: i });
        } else {
          character = char;
          streak = [
            { row: k, col: i }
          ];
        }

        if (streak.length === 3) return streak;
      }

      streak = [];
    }

    return false;
  }

  static setGridlines(gridLines) {
    Screen.gridLines = gridLines;
    Screen.render();
  }

  static printCommands() {

    console.log('');

    for (let cmd in Screen.commands) {
      let description = Screen.commands[cmd].description;
      console.log(`  ${cmd} - ${description}`);
    }

    console.log('');
  }

  static waitForInput() {
    keypress(process.stdin);

    process.stdin.on('keypress', function (ch, key) {

      if (!key) {
        console.log("Warning: Unknown keypress");
      } else if (!Screen.commands.hasOwnProperty(key.name)) {
        Screen.render();
        console.log(`${key.name} not supported.`);
        Screen.printCommands();
      } else {
        Screen.render();
        Screen.commands[key.name].execute();
      }
    });

    process.stdin.setRawMode(true);
    process.stdin.resume();
  }

  static setGrid(row, col, char) {
    if (!Screen.initialized) return;

    if (char.length !== 2) { // Was orginally 1
      throw new Error("invalid grid character");
    }
    Screen.grid[row][col] = char;
  }


  static addCommand(key, description, action) {

    if (key === 'q') {
      throw new Error("you cannot overwrite 'q'");
    }

    Screen.commands[key] = new Command(key, description, action);
  }

  static setQuitMessage(quitMessage) {
    Screen.quitMessage = quitMessage;
  }

  static quit(showMessage=true) {
    if (showMessage) console.log(Screen.quitMessage);
    process.exit(1);
  }

  static render() {

    if (!Screen.initialized) return;

    const spacer = new Array(Screen.spacerCount).fill(' ').join('');

    console.clear();

    let borderLength = Screen.numCols * (Screen.spacerCount * 2 + 1) + 2;
    if (Screen.gridLines) borderLength += Screen.numCols - 1;
    let horizontalBorder = new Array(borderLength).fill(Screen.borderChar).join('');

    console.log(horizontalBorder);

    for (let row = 0 ; row < Screen.numRows ; row++) {

      const rowCopy = [...Screen.grid[row]];

      for (let col = 0 ; col < Screen.numCols ; col++) {

        let textColor = Screen.textColors[row][col] ? Screen.textColors[row][col] : "";
        let backgroundColor = Screen.backgroundColors[row][col] ? Screen.backgroundColors[row][col] : "";
        if (!(textColor && backgroundColor)) textColor = '\x1b[0m';

        let vertLine = (Screen.gridLines && col > 0) ? '|' : '';
        rowCopy[col] = `${Screen.defaultBackgroundColor}${vertLine}\x1b[0m${textColor}${backgroundColor}${spacer}${rowCopy[col]}${spacer}\x1b[0m`;
      }

      if (Screen.gridLines && row > 0) {
        let horizontalGridLine = new Array(rowCopy.length * 5 - 1).fill('-');
        horizontalGridLine.unshift(`${Screen.borderChar}${Screen.defaultBackgroundColor}`);
        horizontalGridLine.push(`\x1b[0m${Screen.borderChar}`);
        console.log(horizontalGridLine.join(''));
      }

      // console.log(rowCopy);

      rowCopy.unshift(`${Screen.borderChar}`);
      rowCopy.push(`${Screen.borderChar}`);

      console.log(rowCopy.join(''));

    }

    console.log(horizontalBorder);

    console.log("");

    console.log(Screen.message);

  }

  static setTextColor(row, col, color) {

    if (!Screen.initialized) return;

    const colorCodes = {
      black: '\x1b[30m',
      red: '\x1b[31m',
      green: '\x1b[32m',
      yellow: '\x1b[33m',
      blue: '\x1b[34m',
      magenta: '\x1b[35m',
      cyan: '\x1b[36m',
      white: '\x1b[37m',
    }

    let code = colorCodes[color];

    if (!code) {
      throw new Error("Invalid color");
    }

    Screen.textColors[row][col] = code;
  }

  static setBackgroundColor(row, col, color) {

    if (!Screen.initialized) return;

    const colorCodes = {
      //background color
      blackBg: '\x1b[40m',
      redBg: '\x1b[41m',
      greenBg: '\x1b[42m',
      yellowBg: '\x1b[43m',
      blueBg: '\x1b[44m',
      cyanBg: '\x1b[46m',
      whiteBg: '\x1b[47m',
      magentaBg: '\x1b[45m',
    }

    let code = colorCodes[color + 'Bg'];

    if (!code) {
      throw new Error("Invalid background color");
    }

    Screen.backgroundColors[row][col] = code;
  }

  static setMessage(msg) {
    Screen.message = msg;
  }

  static setKeypressCallback (keypressCallback) {
    Screen.keypressCallback = keypressCallback;
  }
}

module.exports = Screen;
