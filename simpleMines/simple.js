const size = 9;
const numberOfMines = 12;
const cellPrototype = {};
let firstClick = true;

//background
document.querySelector("body").style.backgroundColor = "#60b347";
const container = document.querySelector(".container");
const minesLeftText = document.querySelector("#mine-count");
minesLeftText.textContent = numberOfMines;

//2 dimensional array of size,size
let arrayCell = new Array(size);
for (let r = 0; r < size; r++) {
  arrayCell[r] = new Array(size);
}

// make a view and each model cell
makeGrid(size, size);

//the grid of buttons in the DOM (browser) and
// array of newCell objects
function makeGrid(rows, cols) {
  container.style.setProperty("--grid-rows", rows);
  container.style.setProperty("--grid-cols", cols);

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      //
      //make cell objects, the MODEL
      //web dev simplified uses element.dataset.status
      const newCell = Object.create(cellPrototype);
      newCell.row = r;
      newCell.col = c;
      newCell.mined = false;
      newCell.visited = false;
      newCell.flagged = false;
      arrayCell[r][c] = newCell;
      //
      //HTML element creation, the VIEW
      let cellElement = document.createElement("div");
      container.appendChild(cellElement).className = "grid-item";
      // buttons
      let button = document.createElement("button");
      button.id = "button-" + r + "-" + c;
      cellElement.appendChild(button);
      // click event for each button
      button.addEventListener("click", () => {
        clickFunction(r, c, button);
      });
      button.addEventListener("contextmenu", (e) => {
        e.preventDefault();
        flagCell(r, c, button);
      });
    }
  }
}

//click event handler for that button
// could use target instead of this,that for clicked button
function clickFunction(row, col, that) {
  //that.style.backgroundColor = "red";
  //that.style = "display: none;";
  that.style =
    "background-color: white; outline: none; border: solid beige 1px; ";

  if (firstClick == true) makeMines(row, col);
  firstClick = false;

  if (arrayCell[row][col].visited == true) {
    return;
  }
  arrayCell[row][col].visited = true;
  // NOTE
  // visited cells should not be flagged
  if (arrayCell[row][col].flagged == true) {
    arrayCell[row][col].flagged = false;
    that.textContent = "";
    countFlags();
  }

  // Here we can see if we won

  if (arrayCell[row][col].mined == true) {
    var t = document.createTextNode("💥");
    that.textContent = "";
    that.appendChild(t);
    // Oh we lost
    minesLeftText.textContent = "BOOM! You lost";
    // reveal mines
    return;
  }

  // log clicked cell...
  // console.log(`clicked: ${arrayCell[row][col]} from `);
  // console.log(arrayCell);

  // get a new list of neighbor cells
  let arrayNeighbors = getNeighborCells(row, col);
  let total = 0;
  //
  //console.log(arrayNeighbors);
  //console.log(arrayCell[arrayNeighbors[0][0]][arrayNeighbors[0][1]]);
  //
  // need to prune out negatives and >=size
  // some arrayNeighbors are undefined

  for (let i = 0; i < arrayNeighbors.length; i++) {
    let r = arrayNeighbors[i][0];
    let c = arrayNeighbors[i][1];
    if (arrayCell[r] && arrayCell[c]) {
      //cleanNeighbors.push(arrayCell[r][c]);
      if (arrayCell[r][c].mined) total++;
    }
  }

  var t = document.createTextNode(`${total}`);
  if (total !== 0) {
    //clear previous and add a text with number of mines
    that.textContent = "";
    that.appendChild(t);
  } else {
    // blank cells get recursive clicks
    for (let i = 0; i < arrayNeighbors.length; i++) {
      let r = arrayNeighbors[i][0];
      let c = arrayNeighbors[i][1];
      if (arrayCell[r] && arrayCell[c]) {
        //console.log(arrayCell[r][c]);
        let str = "#button-" + r + "-" + c;
        let thatButton = document.querySelector(str);
        thatButton.click();
      }
    }
  }
  // Above...
  // if total === 0 want to recursively call click function
  // that reveals 8 arrayNeighbors cells around itself so
  // need a return if already revealed/visited/clicked on this cell b4...
  // propose a .visited on arrayCell
  // propose a fn. that checks if valid cell and returns a name like cell[r,c]
  //
}

function getNeighborCells(row, col) {
  let arrayNeighbors = new Array();

  arrayNeighbors.push([row - 1, col - 1]);
  arrayNeighbors.push([row - 1, col]);
  arrayNeighbors.push([row - 1, col + 1]);
  arrayNeighbors.push([row, col - 1]);
  //arrayNeighbors.push([row], [col]]);
  arrayNeighbors.push([row, col + 1]);
  arrayNeighbors.push([row + 1, col - 1]);
  arrayNeighbors.push([row + 1, col]);
  arrayNeighbors.push([row + 1, col + 1]);

  return arrayNeighbors;
}

function makeMines(r, c) {
  let i = 0;
  let minedCells = [];
  let arrayNeighbors = getNeighborCells(r, c);

  // make an array of objs out of array of arrays
  function transformArrayData(data) {
    var result = []; // new array to hold transformed data
    var value0, value1;
    for (var i = 0; i < data.length; i++) {
      // loop over inner arrays
      value0 = data[i][0];
      value1 = data[i][1]; // and value

      var cell = {
        row: value0,
        col: value1,
      }; // new object for current cell

      result.push(cell); // add new object to array
    }
    return result;
  }
  let arrayOfObjects = transformArrayData(arrayNeighbors);

  console.log(arrayNeighbors);
  console.log(arrayOfObjects);

  while (i < numberOfMines) {
    let rand1 = Math.floor(Math.random() * size);
    let rand2 = Math.floor(Math.random() * size);

    const minedCell = {
      row: rand1,
      col: rand2,
    };

    // don't mine the first cell clicked
    // don't mine the immediate neighbors of that cell
    // AND don't mine a cell already mined...
    if (r !== rand1 && c !== rand2) {
      if (!arrayOfObjects.some((m) => match(m, minedCell))) {
        if (!minedCells.some((m) => match(m, minedCell))) {
          // store already mined here (from WebDev Simplified)
          // where he also goes !minedCells.some(match.bind(null, minedCell))
          minedCells.push(minedCell);
          arrayCell[rand1][rand2].mined = true;
          i++;
        }
      }
    }
  }

  function match(a, b) {
    return a.row === b.row && a.col === b.col;
  }
}

function flagCell(row, col, button) {
  // console.log(`right clicked: ${arrayCell[row][col]} `);
  // console.log(arrayCell[row][col]);
  if (arrayCell[row][col].visited == true) {
    return;
  }
  if (arrayCell[row][col].flagged == true) {
    arrayCell[row][col].flagged = false;
    button.textContent = "";
    countFlags();
    return;
  }
  var t = document.createTextNode("🚩");
  arrayCell[row][col].flagged = true;
  button.textContent = "";
  button.appendChild(t);
  countFlags();
}

function countFlags() {
  let count = 0;
  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      //
      if (arrayCell[r][c].flagged === true) count++;
    }
  }
  minesLeftText.textContent = numberOfMines - count;
  return;
}
