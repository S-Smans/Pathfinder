// Sandis Smans
// Atsevišķš režģis, kas atrodas loģiskājā daļā
class Grid {
    constructor() {
        // satur visus elementu koordinātes uz režģa
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

        // Masīvs satur tā elementa koordinātes, kas to pābaudīja
        // Palīdz atcerēties ceļu, no kura tas ir nācis
        const previous = [];
        // null, jo sākuma punkts nerāda ceļu atpakaļ uz sevi
        previous[startNode] = null;

        // Ja tiek atrasts beigu punkts tā ceļs tiek uzbūvēts
        const createPath = (startNode, endNode, previous) => {
            const path = [];

            // Pievieno beiga punktu koordinātes
            path.push(endNode);

            // Paņem beiga punktu iepriekšejo elementu
            let prior = previous[endNode];

            // Kamēr iepriekšejā koordinātes nav vienādas ar sākuma punktu koordinātēm - būvē ceļu
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
            // Paņem elementa koordinātes
            let elementCoord = queue.shift();

            // Ja elementa koordinātes ir vienādas ar beigu punktu koordinātēm ceļs ir atrasts
            if (arrayEquals(elementCoord, endNode)) {
                return createPath(startNode, endNode, previous);
            }

            // Ja pārbaudītais elementCoord ir undefined atgriez false
            try {
                // Ja elementCoord nav beigu punkts rindā(queue) pievieno elementCoord kaimiņa koordinātes
                for (let i = 0; i < neighbours[elementCoord].length; i++) {
                    // Ja elementCoord kaimiņš nav ticis atklāts tikai tad pievieno viņu rindā
                    if (!discovered[neighbours[elementCoord][i]]) {
                        // elementCoord kaimiņš ir ticis atklāts
                        discovered[neighbours[elementCoord][i]] = true;
                        // Pievieno elementCoord kaimiņu rindā
                        queue.push(neighbours[elementCoord][i]);
                        // pievieno elementu attālumu no sākuma punkta
                        distance[neighbours[elementCoord][i]] =
                            distance[elementCoord] + 1;
                        // pievieno elementCoord kā tas kas atklāja kaimiņu
                        previous[neighbours[elementCoord][i]] = elementCoord;
                    }
                }
            } catch (e) {
                alert(e + ".\n Koordinātes nav iespējamas.");
                return false;
            }
        }

        return false;
    }
}

// Izveido režģi dokumentā
function createGridInDocument() {
    // Izveido režģā elementus grafiskajai daļai
    for (let col = 1; col <= Math.sqrt(nodeCount); col++) {
        // Masīvs, kas saglabās elementa koordinātes
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
            divCol.append(divRow);
        }

        // Saglabā šīs kollonas iterācijas elementu koordinātes
        grid.addElement(nodeCoordinates);

        // Ievada kollonu ar rindām dokumenta režģī
        gridDiv.append(divCol);
    }

    // Iespējamie soļi kur elementa kaimiņi varētu atrasties
    let possibleMoves = [
        [-1, 0], // kreisi
        [0, 1], // leju
        [1, 0], // labi
        [0, -1], // augšu
    ];

    // iedod katram elementam kaimiņus
    for (let col = 0; col < Math.sqrt(nodeCount); col++) {
        for (let row = 0; row < Math.sqrt(nodeCount); row++) {
            for (let move = 0; move < possibleMoves.length; move++) {
                // aprēķina kaimiņa koordinātes saskaitot esošo elementu ar iespējamiem kaimiņiem
                let coord = possibleMoves[move].map(function (num, idx) {
                    return num + grid.elementsCoord[col][row][idx];
                });

                // Pārbauda vai koordinātes eksistē uz režģa
                for (let i = 0; i < grid.elementsCoord.length; i++) {
                    if (isCoordAvailable(grid.elementsCoord[i], coord)) {
                        // Ja eksistē elementam pievieno kaimiņa koordinātes
                        grid.addNeighbour(col + 1 + "," + (row + 1), coord);
                    }
                }
            }
        }
    }
}

// Pārbauda vai koordinātes ir iespējamas uz režģa
function isCoordAvailable(array, coord) {
    var item_as_string = JSON.stringify(coord);

    var contains = array.some(function (ele) {
        return JSON.stringify(ele) === item_as_string;
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
    let data = event.dataTransfer.getData("text");

    if (data == "startPoint") {
        event.target.style.backgroundColor = "blue";
        event.target.className += " start";
    }

    if (data == "endPoint") {
        event.target.style.backgroundColor = "green";
        event.target.className += " end";
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

// Sāk meklēt isāko ceļu
function start() {
    let points = findPoints();

    let start = points["start"];
    let end = points["end"];

    let result = grid.breadthFirstSearch(start, end);

    // Iekrāso isāko ceļu
    for (let path = 0; path < result.length; path++) {
        let pathCoord = result[path].join(",");
        document.getElementById(pathCoord).style.backgroundColor = "yellow";
    }
}

// Izdzēš režģi
function deleteGrid() {
    while (gridDiv.hasChildNodes()) {
        gridDiv.removeChild(gridDiv.lastChild);
    }

    // izdzēš loģiskā daļas elementu sastāvu
    for (const key in grid) {
        if(Array.isArray(grid[key])) {
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
    deleteGrid();
    nodeCount = slider.value * slider.value;
    gridDiv.style.gridTemplateColumns = `repeat(${Math.sqrt(nodeCount)}, 1fr)`;
    createGridInDocument();
    console.log(grid);
}

const slider = document.querySelector('.slider');
const value = document.querySelector('.value');

// parāda slider vērtību
value.innerText = slider.value + "x" + slider.value;

const gridDiv = document.querySelector(".grid");

// Cik daudz elementu ir uz rezģa
let nodeCount = slider.value * slider.value;

// Pievieno pareizo kolonnu skaitu
gridDiv.style.gridTemplateColumns = `repeat(${Math.sqrt(nodeCount)}, 1fr)`;

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
        resetGrid();
    });

    gridSize.addEventListener("click", () => {
        resetGrid();
    });

    slider.addEventListener('input', () => {
        value.innerText = slider.value + "x" + slider.value;
    });

    createGridInDocument();
});

