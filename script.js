
const BORDER_STYLE = "thin solid";
const DEFAULT_GRID_SIZE = 16;
const DEFAULT_PEN_COLOR = "black";
const DEFAULT_GRID_BACKGROUND_COLOR = "";
const DEFAULT_GRID_LINES_ON = new Boolean(true);
const DEFAULT_MODE = "custom";//custom, random, grayscale, snake

let gridLinesOn = DEFAULT_GRID_LINES_ON;
let penColor = DEFAULT_PEN_COLOR;
let currentGridSize = DEFAULT_GRID_SIZE;
let mode = DEFAULT_MODE;

const body= document.querySelector("body");
const gridContainer = document.createElement("div");
gridContainer.classList.add("grid-container");
body.appendChild(gridContainer);

const customMode = document.getElementById("custom");
const randomMode = document.getElementById("random");
const grayscaleMode = document.getElementById("grayscale");
const snakeMode = document.getElementById("snake");
const colorPicker = document.getElementById("square-color");
const gridLines = document.getElementById("check");
const gridSize = document.getElementById("gridSize");
const clearBtn = document.getElementById("clearButton");

customMode.addEventListener("click", () => {mode = "custom";});
randomMode.addEventListener("click", () => {mode = "random";});
grayscaleMode.addEventListener("click", () => {mode = "grayscale";});
snakeMode.addEventListener("click", () => {mode = "snake";});
colorPicker.addEventListener("change", (e) => {penColor = e.target.value;}, false);
gridLines.addEventListener("change", toggleGridLines);
clearBtn.addEventListener("click", clearGrid);
gridSize.addEventListener("change", updateGridSize, false);


createSquares(currentGridSize);


// Functions
function createSquares(currentSize){
    deleteSquares();
    gridContainer.style.gridTemplateColumns = `repeat(${currentSize}, 1fr)`;
    gridContainer.style.gridTemplateRows = `repeat(${currentSize}, 1fr)`;

    let currentGridArea = Math.pow(currentSize,2);
    for(i=0; i<currentGridArea; i++){
        const square = document.createElement("div");
        square.classList.add("square"+i);
        if(gridLinesOn) {square.style.border = BORDER_STYLE;};
        gridContainer.appendChild(square);
        square.addEventListener("mouseenter", drawGrid);
    };
    clearGrid();
};

function drawGrid(){
    switch(mode){
        case("custom"):
            this.style.backgroundColor = penColor;
            break;
        case("random"):
            this.style.backgroundColor = getRandomColor();
            break;
        case("grayscale"):
            if (this.style.backgroundColor.match(/rgba/)) {
                let currentOpacity = Number(this.style.backgroundColor.slice(-4, -1));
                if (currentOpacity <= 0.9) 
                    this.style.backgroundColor = `rgba(0, 0, 0, ${currentOpacity + 0.1})`;
            } 
            else if (this.style.backgroundColor == "rgb(0, 0, 0)")
                return;
            else 
                this.style.backgroundColor = "rgba(0, 0, 0, 0.1)";  
            break;
        case("snake"):
            this.style.backgroundColor = penColor;
            setTimeout(()  => {
                this.style.backgroundColor = "";
            }, 500);
    }
}

function clearGrid(){
    const squares = gridContainer.querySelectorAll("div");
    squares.forEach(element => {
        element.style.backgroundColor = DEFAULT_GRID_BACKGROUND_COLOR;
    });
}

function toggleGridLines(){
    (!gridLines.checked)? gridLinesOn = Boolean(false): gridLinesOn = Boolean(true);
    deleteSquares();
    createSquares(currentGridSize);
};

function updateGridSize(e){
    currentGridSize = e.target.value;
    createSquares(currentGridSize);
}

function deleteSquares(){
    gridContainer.innerHTML = "";
}

function getRandomColor(){
   return "#"+Math.floor(Math.random()*16777215).toString(16);
}