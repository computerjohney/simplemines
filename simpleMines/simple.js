const size = 6;
const numberOfMines = 6;
const cellPrototype = {};
let firstClick = true;

//background
document.querySelector("body").style.backgroundColor = "#60b347";
const container = document.querySelector(".container");

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
      const newCell = Object.create(cellPrototype);
      newCell.row = r;
      newCell.col = c;
      newCell.mined = false;
      newCell.visited = false;
      arrayCell[r][c] = newCell;
      //
      //HTML element creation, the VIEW
      let cellElement = document.createElement("div");
      cellElement.id = "cellElement-" + r + "-" + c;
      container.appendChild(cellElement).className = "grid-item";
      // buttons
      const button = document.createElement("button");
      cellElement.appendChild(button);
      // click event for each button
      button.addEventListener("click", function () {
        clickFunction(r, c, this);
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

  if (arrayCell[row][col].mined == true) {
    var t = document.createTextNode("💥");
    that.textContent = "";
    that.appendChild(t);
    return;
  }

  // log clicked cell...
  // console.log(`clicked: ${arrayCell[row][col]} from `);
  // console.log(arrayCell);

  // get a list of neighbor cells
  let arrayNeighbors = new Array();
  //let cleanNeighbors = new Array();
  arrayNeighbors.push([row - 1, col - 1]);
  arrayNeighbors.push([row - 1, col]);
  arrayNeighbors.push([row - 1, col + 1]);
  arrayNeighbors.push([row, col - 1]);
  //arrayNeighbors.push([row], [col]]);
  arrayNeighbors.push([row, col + 1]);
  arrayNeighbors.push([row + 1, col - 1]);
  arrayNeighbors.push([row + 1, col]);
  arrayNeighbors.push([row + 1, col + 1]);
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
  if (!arrayCell[row][col].mined && total !== 0) {
    //clear previous
    that.textContent = "";
    that.appendChild(t);
  } else {
    for (let i = 0; i < arrayNeighbors.length; i++) {
      let r = arrayNeighbors[i][0];
      let c = arrayNeighbors[i][1];
      if (arrayCell[r] && arrayCell[c]) {
        console.log(arrayCell[r][c]);
        let str = "cellElement-" + r + "-" + c;
        let thatButton = document.querySelector(str); //.firstChild;
        console.log(thatButton);
      }
    }
  }
  //
  // if total === 0 want to recursively call click function
  // that reveals 8 arrayNeighbors cells around itself so
  // need a return if already revealed/visited/clicked on this cell b4...
  // propose a .visited on arrayCell
  // propose a fn. that checks if valid cell and returns a name like cell[r,c]
  // var str = "cellElement-" + cleanNeighbors[i][0] + "-" + cleanNeighbors[i][1];
  // var thatButton = document.querySelector(str).firstChild;
  // console.log(thatButton);
  //
}

function makeMines(row, col) {
  let i = 0;
  let minedCells = [];
  while (i < numberOfMines) {
    let rand1 = Math.floor(Math.random() * size);
    let rand2 = Math.floor(Math.random() * size);

    const minedCell = {
      row: rand1,
      col: rand2,
    };

    // don't mine the first cell clicked
    // AND don't mine a cell already mined...
    if (row !== rand1 && col !== rand2) {
      if (!minedCells.some((m) => match(m, minedCell))) {
        // store already mined here (from WebDev Simplified)
        // where he also goes !minedCells.some(match.bind(null, minedCell))
        minedCells.push(minedCell);
        arrayCell[rand1][rand2].mined = true;
        i++;
      }
    }
  }

  function match(a, b) {
    return a.row === b.row && a.col === b.col;
  }
}
