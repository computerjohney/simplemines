//the grid table of buttons
function printBtn() {
  const container = document.querySelector(".container");
  const tbl = document.createElement("table");
  tbl.style =
    "border: 1px solid black; margin: 0; padding: 0; border-spacing:0; border-collapse: collapse;";

  for (let row = 0; row < 7; row++) {
    const tr = tbl.insertRow();

    for (let col = 0; col < 7; col++) {
      const btn = document.createElement("button");
      btn.style = "border: 1px solid black; width:50px; height: 50px;";
      // click event for each button
      btn.addEventListener("click", function () {
        clickFunction(row, col, this);
      });
      const td = tr.insertCell();
      td.style = "margin: 0; padding: 0; width:50px; height: 50px;";
      var t = document.createTextNode(`${row},${col}`);
      btn.appendChild(t);
      td.appendChild(btn);
    }
  }

  container.appendChild(tbl);
}
