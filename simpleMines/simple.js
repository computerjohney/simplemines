import { fruits } from "./Cell.js";

//background
document.querySelector("body").style.backgroundColor = "#60b347";
const container = document.querySelector(".container");

//the grid table of buttons
function makeRows(rows, cols) {
  container.style.setProperty("--grid-rows", rows);
  container.style.setProperty("--grid-cols", cols);
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      let cell = document.createElement("div");
      //cell.innerHTML = `${r},${c}`;
      container.appendChild(cell).className = "grid-item";
      // buttons
      var t = document.createTextNode(`${r},${c}`);
      const btn = document.createElement("button");
      btn.appendChild(t);
      cell.appendChild(btn);
      // click event for each button
      btn.addEventListener("click", function () {
        clickFunction(r, c, this);
      });
    }
  }
}

makeRows(7, 7);

// check module works
console.log(fruits);

//click event handler for that button
function clickFunction(row, col, that) {
  //that.style.backgroundColor = "red";
  //that.style = "display: none;";
  that.style =
    "background-color: white; outline: none; border: solid beige 1px; ";
}
