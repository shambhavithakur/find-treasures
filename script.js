function init() {
  let cellSelector = 0;
  let selectorList = [];
  let counter = 0;
  let startTime = 0;
  let totalTime = 0;
  let identifiedTreasures = 0;
  const cells = document.querySelectorAll(".board > button");
  const shader = document.querySelector(".shader");

  for (let i = 0; i < cells.length; i++) {
    cells[i].classList.remove(
      "box",
      "td",
      "green",
      "red",
      "selected",
      "game-over"
    );
  }

  shader.classList.remove("visible");

  function generateTreasure() {
    for (let i = 0; i < 10; i++) {
      cellSelector = Math.floor(Math.random() * 48 + 1);
      if (
        !selectorList.includes(cellSelector) &&
        !selectorList.includes(cellSelector + 1) &&
        !selectorList.includes(cellSelector - 1)
      ) {
        selectorList.push(cellSelector);
      }
    }
    for (let i = 0; i < selectorList.length; i++) {
      if (selectorList[i] < 10) {
        selectorList[i] = "0" + selectorList[i];
      }
      document.querySelector(".col" + selectorList[i]).classList.add("box");
    }
  }

  function showShader() {
    shader.classList.add("visible");
    document.querySelector(".total-time").textContent = totalTime;
  }
  function addIcons() {
    if (counter === 0) {
      counter++;
      startTime = Date.now();
    }
    if (identifiedTreasures < selectorList.length) {
      if (this.classList.contains("box")) {
        this.classList.add("green", "selected");
        identifiedTreasures++;
      } else {
        this.classList.add("red", "selected");
      }
    }
    if (identifiedTreasures === selectorList.length) {
      for (let i = 0; i < cells.length; i++) {
        if (!cells[i].classList.contains("selected")) {
          cells[i].classList.add("red", "game-over");
        }
      }
      for (let i = 0; i < cells.length; i++) {
        cells[i].removeEventListener("click", addIcons);
      }
      totalTime = Math.floor(Date.now() - startTime) / 1000;
      shader.classList.add("visible");
      document.querySelector(".total-time").textContent = totalTime;
      showShader();
    }
  }

  generateTreasure();

  for (let i = 0; i < cells.length; i++) {
    if (!cells[i].classList.contains("box")) {
      cells[i].classList.add("td");
    }
  }
  for (let i = 0; i < cells.length; i++) {
    cells[i].addEventListener("click", addIcons);
  }
}

init();

document.querySelector(".modal-button").addEventListener("click", init);
