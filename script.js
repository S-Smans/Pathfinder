// Sandis Smans
// Režģa klase
class Grid {
  constructor() {
    // satur visus elementu koordinātas uz režģa
    this.elementsCoord = [];
    // satur visus pieejamos elementa kaimiņus uz režģa
    this.neighbours = {};
  }

  // Pievieno elementu uz režģa
  addElement(element) {
    this.elementsCoord.push(element);

    // Katram elementam iedod masīvu, kas saglabās kaimiņus
    for (let i = 0; i < element.length; i++) {
      this.neighbours[element[i]] = [];
    }
  }

  // Pievieno elementam kaimiņu
  addNeighbour(element, coord) {
    this.neighbours[element].push(coord);
  }

  // Ceļu meklēšanas algoritms
  breadthFirstSearch(startNode = this.elementsCoord[0], endNode) {
    let neighbours = this.neighbours;

    // Izveido rindu pēc kā tiek pārbaudīti elementi
    const queue = [];
    queue.push(startNode);

    // Masīvs kas satur visus pārbaudītos elementus
    const discovered = [];
    discovered[startNode] = true;

    // Masīvs kas satur katra elementa attālumu no sākuma punkta
    const distance = [];
    distance[startNode] = 0;

    // Masīvs satur tā elementa koordinātas, kas to pābaudīja
    // Palīdz atcerēties ceļu, no kura tas ir nācis
    const previous = [];
    // null, jo sākuma punkts nerāda ceļu atpakaļ uz sevi
    previous[startNode] = null;

    // Ja tiek atrasts beigu punkts tā ceļs tiek uzbūvēts
    const createPath = (startNode, endNode, previous) => {
      const path = [];

      // Pievieno beiga punktu koordinātas
      path.push(endNode);

      // Paņem beiga punktu iepriekšejo elementu
      let prior = previous[endNode];

      // Kamēr iepriekšejā koordinātas nav vienādas ar sākuma punktu koordinātēm - būvē ceļu
      while (prior != startNode) {
        path.push(prior);
        prior = previous[prior];
      }

      // Ievada sakuma punktu
      path.push(startNode);

      // atgriež īsāko ceļu
      return path;
    };

    // Kamēr elementu ir rindā tikmēr meklē ceļu
    while (queue.length) {
      // Paņem elementa koordinātas
      let elementCoord = queue.shift();

      // Ja elementa koordinātas ir vienādas ar beigu punktu koordinātēm ceļs ir atrasts
      if (arrayEquals(elementCoord, endNode)) {
        return {
          path: createPath(startNode, endNode, previous),
          discovered: discovered,
          distance: distance,
        };
      }

      // Ja pārbaudītais elementCoord ir undefined atgriez false
      try {
        // Ja elementCoord nav beigu punkts rindā(queue) pievieno elementCoord kaimiņa koordinātas
        for (let i = 0; i < neighbours[elementCoord].length; i++) {
          // Ja elementCoord kaimiņš nav ticis atklāts tikai tad pievieno viņu rindā
          if (!discovered[neighbours[elementCoord][i]]) {
            // elementCoord kaimiņš ir ticis atklāts
            discovered[neighbours[elementCoord][i]] = true;
            // Pievieno elementCoord kaimiņu rindā
            queue.push(neighbours[elementCoord][i]);
            // pievieno elementu attālumu no sākuma punkta
            distance[neighbours[elementCoord][i]] = distance[elementCoord] + 1;
            // pievieno elementCoord kā tas kas atklāja kaimiņu
            previous[neighbours[elementCoord][i]] = elementCoord;
          }
        }
      } catch (e) {
        return false;
      }
    }
    return false;
  }
}

// Elements kas saturēs režģa elementa lielumu skaitu
let sValue;

// Vai pele ir nospiesta uz laukuma
let isMousedown = false;
let isRemove = false;

document.addEventListener("mouseup", () => {
  isMousedown = false;
});
// Izveido režģi dokumentā
function createGridInDocument() {
  sValue = slider.value;
  currentSize.innerText = sValue;

  // Izveido režģā elementus grafiskajai daļai
  for (let col = 1; col <= Math.sqrt(nodeCount); col++) {
    // Masīvs, kas saglabās elementa koordinātas
    let nodeCoordinates = [];

    let divCol = document.createElement("div");

    // Pieliek elementam divas klases 1 - "node" 2 = "node" + elementa numurs
    divCol.className = "col col" + col;

    // katrā kolonnā izveido rindu/elementu
    for (let row = 1; row <= Math.sqrt(nodeCount); row++) {
      let divRow = document.createElement("div");

      // Saglabā elementa koordinātas masīvā
      nodeCoordinates.push([col, row]);

      // Katram elementam izveido klasi ar atrašanās vietu
      divRow.className = "row";
      divRow.id = col + "," + row;

      // ieviest iespēju vilkt un nomest elementus
      divRow.addEventListener("dragover", (e) => allowDrop(e));
      divRow.addEventListener("drop", (e) => drop(e));
      // uzspiežot uz elementa pievieno sķērsli
      divRow.addEventListener("click", (e) => addWall(e.target));

      // Sienu zīmēšanas implementācīja
      divRow.addEventListener("mousedown", (e) => {
        if (e.target.className === "row blocked") {
          isMousedown = true;
          isRemove = true;
        } else {
          isMousedown = true;
        }
      });

      divRow.addEventListener("mouseup", () => {
        isMousedown = false;
        isRemove = false;
      });

      divRow.addEventListener("mousemove", (e) => {
        if (isMousedown && e.target.className !== "row blocked" && !isRemove) {
          addWall(e.target);
        } else if (
          isMousedown &&
          e.target.className === "row blocked" &&
          isRemove
        ) {
          addWall(e.target);
        }
      });

      divCol.append(divRow);
    }

    // Saglabā šīs kollonas iterācijas elementu koordinātas
    grid.addElement(nodeCoordinates);

    // Ievada kollonu ar rindām dokumenta režģī
    gridDiv.append(divCol);
  }
  startPoint = null;
  endPoint = null;
}

// Pārbauda vai koordinātas ir iespējamas uz režģa
function isCoordAvailable(array, coord) {
  const item_as_string = JSON.stringify(coord);

  const contains = array.some(function (ele) {
    loopCount++;
    return (
      JSON.stringify(ele) === item_as_string &&
      document.getElementById(ele.toString()).className != "row blocked"
    );
  });

  return contains;
}

// Pārbauda vai masīvi ir vienādi
function arrayEquals(arrayOne, arrayTwo) {
  return (
    Array.isArray(arrayOne) &&
    Array.isArray(arrayTwo) &&
    arrayOne.length === arrayTwo.length &&
    arrayOne.every((val, index) => val === arrayTwo[index])
  );
}

// Kad sākuma vai beiga punkti tiek paņemti
function drag(event) {
  // paņem vilktā elementa className
  event.dataTransfer.setData("text", event.target.className);
}

// Norāda, kur var nomest vilktos datus
function allowDrop(event) {
  // Atļauj uz elementa nomest vilktos datus
  event.preventDefault();
}

// Darbība kad sākuma/beigu punkts tiek nomest uz režģā elementa
function drop(event) {
  event.preventDefault();

  // Saglabā vilktā elementa klasi
  let data = event.dataTransfer.getData("text");
  // Ja vilktais elements ir sākuma punkts
  if (data == "startPoint") {
    removePoint(startPoint);
    startPoint = event.target.id;
    event.target.className = "row start";
  }

  // Ja vilktais elements ir beigu punkts
  if (data == "endPoint") {
    removePoint(endPoint);
    endPoint = event.target.id;
    event.target.className = "row end";
  }
}

// noņem iepriekšējo sākuma punktu
function removePoint(point) {
  if (point === null) {
    return;
  }
  pointDiv = document.getElementById(point);

  pointDiv.removeAttribute("style");
  pointDiv.className = "row";
}

// Pievieno šķērsli
function addWall(event) {
  if (event.className === "row start") {
    event.className = "row blocked";
    startPoint = null;
  } else if (event.className === "row end") {
    event.className = "row blocked";
    endPoint = null;
  } else if (event.className != "row blocked") {
    event.className = "row blocked";
  } else {
    event.className = "row";
  }
}

// Atrod sākuma un beigu punktu režģī
function findPoints() {
  let points = [];

  for (let col = 0; col < Math.sqrt(nodeCount); col++) {
    for (let row = 0; row < Math.sqrt(nodeCount); row++) {
      let element = grid.elementsCoord[col][row].toString();
      if (document.getElementById(element).className === "row start") {
        points["start"] = grid.elementsCoord[col][row];
      }
      if (document.getElementById(element).className === "row end") {
        points["end"] = grid.elementsCoord[col][row];
      }
    }
  }
  return points;
}

let loopCount = 0;

// iedod katram elementam kaimiņus
function addNeighbours() {
  // Iespējamie kaimiņa koordinātas
  let possibleNeighbours = [
    [0, 1], // leju
    [1, 0], // labi
    [-1, 0], // kreisi
    [0, -1], // augšu
  ];

  // iedod katram elementam kaimiņus
  for (let col = 0; col < Math.sqrt(nodeCount); col++) {
    for (let row = 0; row < Math.sqrt(nodeCount); row++) {
      for (let move = 0; move < possibleNeighbours.length; move++) {
        // aprēķina kaimiņa koordinātas saskaitot esošo elementu ar iespējamiem kaimiņiem
        let coord = possibleNeighbours[move].map(function (num, idx) {
          return num + grid.elementsCoord[col][row][idx];
        });

        // Pārbauda vai koordinātas eksistē uz režģa
        for (let i = 0; i < grid.elementsCoord.length; i++) {
          if (isCoordAvailable(grid.elementsCoord[i], coord)) {
            // Ja eksistē elementam pievieno kaimiņa koordinātas
            grid.addNeighbour(col + 1 + "," + (row + 1), coord);
          }
        }
      }
    }
  }
}

// Sāk meklēt isāko ceļu
function start() {
  // Saglabā elementus bez kaimiņiem, ja sākuma un beigu punkti nav ievietoti tad attiestata elementus bez kaimiņiem
  const noNeighbours = JSON.parse(JSON.stringify(grid.neighbours));
  if (running === false && finished === false) {
    // Vispirms atrod iespējamos elementa kaimiņus
    addNeighbours();

    let points = findPoints();

    let start = points["start"];
    let end = points["end"];

    let result = grid.breadthFirstSearch(start, end);
    console.log(result);
    if (result !== false) {
      // aizliedz jebkādu lietotāja darbību uz režģā
      document.querySelector(".grid").style.pointerEvents = "none";
      let path = result["path"];
      // masīvu reverse, jo tad ceļš būvējas no sākuma punkta nevis no beigu punkta
      path.reverse();
      let discovered = result["discovered"];
      colorDiscovered(discovered, path, end);
    } else {
      if (!start || !end) {
        // Modāls. Atver logu, kas pasaka lai pievieno sākumu un beigu punktu
        modalError(
          "Sākuma punkts vai beigu punkts nav ievietots!",
          "Lai ievietotu punktus, velciet atbilstošā punkta krāsu uz laukuma, turot nospiestu peli"
        );
      } else {
        // Modāls. Atver logu, ja nav iespējams atrast īsāko ceļu
        modalError(
          "Nav iespējams atrast īsāko ceļu!",
          "Pārliecinieties, vai neviena dzeltena siena neaizsedz pieejamo ceļu"
        );
      }
      // Noņem kaimiņus visiem elementiem
      grid.neighbours = noNeighbours;
    }
  }

  // Iekrāso katru elementu ko algoritms pārbaudīja
  function colorDiscovered(discovered, path, end) {
    let i = 1;
    let color = "#4D774E";
    running = true;
    finished = true;
    Object.keys(discovered).forEach(function (coord) {
      i++;
      setTimeout(() => {
        document.getElementById(coord).style.backgroundColor = color;
        // Ja koordinātas ir vienādas ar beigu punktu beidz iekrāsot pārbaudītos elementus
        if (coord === end.toString()) {
          colorPath(path);
          color = "#C5D1EB";
        }
      }, 50 * i);
    });
  }
}

// Iekrāso isāko ceļu
function colorPath(path) {
  for (let i = 0; i < path.length; i++) {
    setTimeout(() => {
      let pathCoord = path[i].join(",");
      document.getElementById(pathCoord).style.backgroundColor = "yellow";
    }, 50 * i);
  }
  running = false;
}

// Izdzēš režģi
function deleteGrid() {
  finished = false;

  while (gridDiv.hasChildNodes()) {
    gridDiv.removeChild(gridDiv.lastChild);
  }

  // izdzēš loģiskā daļas elementu sastāvu
  for (const key in grid) {
    if (Array.isArray(grid[key])) {
      grid[key] = [];
    } else {
      emptyObject(grid[key]);
    }
  }
}

// Noņem visa objekta elementus
function emptyObject(obj) {
  for (const key in obj) {
    delete obj[key];
  }
}

// atiestatīt režģi
function resetGrid() {
  document.querySelector(".grid").style.pointerEvents = "auto";
  deleteGrid();
  nodeCount = slider.value * slider.value;
  gridDiv.style.gridTemplateColumns = `repeat(${Math.sqrt(nodeCount)}, 1fr)`;
  createGridInDocument();

  // Uzlādē no datubāzes pareizos izmēra laukus
  $.get(
    "loadCard.php",
    {
      size: slider.value,
    },
    function (data) {
      loadSavedSizeGrids(data);
    }
  );
}

// Režģis izveidots no datubāzes iestatījumiem
function customGrid(size) {
  document.querySelector(".grid").style.pointerEvents = "auto";
  deleteGrid();
  nodeCount = size * size;
  gridDiv.style.gridTemplateColumns = `repeat(${Math.sqrt(nodeCount)}, 1fr)`;
  createGridInDocument();
}

const currentSize = document.querySelector(".currentSize");
const slider = document.querySelector(".slider");
const value = document.querySelector(".value");
let startPoint = null;
let endPoint = null;
let running = false;
let finished = false;

// saglabā izvēlēto šķēršļa preset
let preset = null;

// parāda slider vērtību
value.innerText = slider.value + "x" + slider.value;

const gridDiv = document.querySelector(".grid");
const infoDiv = document.querySelector(".info");

// Cik daudz elementu ir uz rezģa
let nodeCount = slider.value * slider.value;

// Pievieno pareizo kolonnu skaitu
gridDiv.style.gridTemplateColumns = `repeat(${Math.sqrt(nodeCount)}, 1fr)`;

// Event listener uz selection elementa
let selection = document.querySelector(".selection");

// Event listener prieks available-grids
let availableGrids = document.querySelector(".available-grids");

let grid = new Grid();

// Mājas lapas iestatīšana, kad tiek ielādēta
window.addEventListener("load", () => {
  const execute = document.querySelector(".start");
  const reset = document.querySelector(".reset");
  const gridSize = document.querySelector(".grid-size");

  execute.addEventListener("click", () => {
    start();
  });

  reset.addEventListener("click", () => {
    if (running === false) {
      resetGrid();
    }
  });

  gridSize.addEventListener("click", () => {
    if (running === false) {
      resetGrid();
    }
  });

  slider.addEventListener("input", () => {
    value.innerText = slider.value + "x" + slider.value;
  });

  createGridInDocument();

  // Ievada pogas veida visus elementu skaitu lielumus
  $.get("gridSize.php", (data, status) => {
    // data satur name no SQL datubāzes
    data = JSON.parse(data);
    //loadSavedSizeGrids();
    data.forEach((name) => {
      let value = document.createElement("button");
      value.className = "size";
      value.innerText = name["size"];
      selection.append(value);
    });
  });

  // Noklusejuma opcija ko uzlādē no datubāzes
  $.get(
    "loadCard.php",
    {
      size: 12,
    },
    function (data) {
      loadSavedSizeGrids(data);
    }
  );
});

// logs kur var saglabāt un uzlādēt režgi no datubāzes
function loadSavedSizeGrids(data) {
  availableGrids.innerHTML = "";
  data = JSON.parse(data);

  // Izveido 3 logus zem selelekcijas pogām
  data.forEach((name) => {
    let container = document.createElement("div");
    let paragraph = document.createElement("p");
    let div = document.createElement("div");

    let load = document.createElement("button");
    load.id = name["name"];
    load.innerText = "Load";
    load.addEventListener("click", loadGrid);

    container.className = "card";
    paragraph.innerText = name["name"];
    container.append(paragraph);

    // Var saglabāt koordinātas, ja režģis ir tāda paša izmēra kā selelekcijas pogu numurs
    if (name["name"].substring(10) == sValue) {
      let save = document.createElement("button");
      save.id = name["name"];
      save.innerText = "Save";
      save.addEventListener("click", saveGrid);
      div.append(save);
    }

    div.append(load);
    container.append(div);
    availableGrids.append(container);
  });
}

// Saglabā režģa siena novietojumu
function saveGrid(e) {
  if (e.target.id.substring(10) == sValue) {
    $.get(
      "saveGrid.php",
      {
        name: e.target.id,
        walls: getWalls(),
      },
      function () {}
    );
  } else {
    alert("Nepareizs režģa izmērs");
  }
}

// Uzlādē režģa siena novietojumu
function loadGrid(e) {
  if (running === false) {
    $.get(
      "loadGrid.php",
      {
        name: e.target.id,
        size: e.target.id.substring(10),
      },
      function (data) {
        createMaze(data);
      }
    );

    sValue = e.target.id.substring(10);

    $.get(
      "loadCard.php",
      {
        size: e.target.id.substring(10),
      },
      function (data) {
        loadSavedSizeGrids(data);
      }
    );
    slider.value = e.target.id.substring(10);
    value.innerText = slider.value + "x" + slider.value;
  }
}

// Click event listener priekš katra selekcijas pogas
$(document).on("click", ".size", function (event) {
  // Uzrāda atbilstošos uzlādējamos režģa koordinātas
  $.get(
    "loadCard.php",
    {
      size: event.target.innerText,
    },
    function (data) {
      loadSavedSizeGrids(data);
    }
  );
});

// Novieto šķēršļus no datubāzes koordinātēm
function createMaze(data) {
  // datus no JSON dabū JS masīvā
  data = JSON.parse(data);
  let size = data["size"];
  data = data[0]["coord"];
  coordArray = data.split("-");
  customGrid(size);
  if (coordArray != "") {
    coordArray.forEach((coord) => {
      let coordDiv = document.getElementById(coord);
      addWall(coordDiv);
    });
  }
  sValue = size;
  currentSize.innerText = sValue;
}

// Dabū sķēršļu koordinātas no režģā;
function getWalls() {
  // saglabā visas koordinātas vienā tekstā
  let allCoord = "";
  for (let col = 0; col < Math.sqrt(nodeCount); col++) {
    for (let row = 0; row < Math.sqrt(nodeCount); row++) {
      let coord = grid["elementsCoord"][col][row].toString();
      if (document.getElementById(coord).className == "row blocked") {
        allCoord += coord + "-";
      }
    }
  }
  // noņem pēdējo "-" simbolu
  return (allCoord = allCoord.substring(0, allCoord.length - 1));
}

// Uznirstošais logs
const modal = document.querySelector(".modal");
const closeModal = document.querySelector(".close-modal");

// Aizver logu ja uzspiež uz Uznirstošā loga fona
window.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.style.display = "none";
  }
});

// Aizver Uznirstošo logu ja uzspiež uz krustiņa
closeModal.addEventListener("click", () => {
  modal.style.display = "none";
});

// Atveras Uznirstošais logs
function modalError(h2Text, pText) {
  const h2Error = document.querySelector(".h2-error");
  const pError = document.querySelector(".p-error");

  h2Error.innerText = h2Text;
  pError.innerText = pText;

  modal.style.display = "block";
}
