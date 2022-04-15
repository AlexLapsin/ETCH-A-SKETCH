
const BORDER_STYLE = "0.01px solid";
const DEFAULT_GRID_SIZE = 16;
const DEFAULT_PEN_COLOR = "black";
const DEFAULT_GRID_COLOR = "";
const DEFAULT_GRID_LINES_ON = new Boolean(true);

let gridLinesOn = DEFAULT_GRID_LINES_ON;
let penColor = DEFAULT_PEN_COLOR;
let gridColor = DEFAULT_GRID_COLOR;
let currentGridSize = DEFAULT_GRID_SIZE;

const body = document.querySelector('body');
const gridContainer = document.createElement('div');

//create the gridContainer that stores the squares
gridContainer.classList.add("grid-container");
body.appendChild(gridContainer);

createSquares(currentGridSize);

const colorPicker = document.querySelector("#square-color");
colorPicker.addEventListener("change", (e) => {
    penColor = e.target.value;
}, false);

//grid lines on/off
const gridLines = document.getElementById("check");
gridLines.addEventListener("change", () => {
    (!gridLines.checked)? gridLinesOn = Boolean(false): gridLinesOn = Boolean(true);
    deleteSquares();
    createSquares(currentGridSize);
})

//change num of squares
const squaresNumber = document.querySelector("#gridSize");
squaresNumber.addEventListener("change", (e) => {
    currentGridSize = e.target.value;
    createSquares(currentGridSize);
}, false);


//create squares
function createSquares(currentSize){
    let currentGridArea = Math.pow(currentSize,2)
    deleteSquares();

    gridContainer.style.gridTemplateColumns = `repeat(${currentSize}, 1fr)`
    gridContainer.style.gridTemplateRows = `repeat(${currentSize}, 1fr)`
    
    for(i=0; i<currentGridArea; i++){
        const square = document.createElement('div');
        square.classList.add("square"+i);
        if(gridLinesOn) {square.style.border = BORDER_STYLE;}
        gridContainer.appendChild(square);
            square.addEventListener("mouseenter", (e) => {
            // highlight the mouseenter target
             e.target.style.backgroundColor = penColor;
            
            // reset the color after a short delay (for snake)
            // setTimeout(function() {
            // e.target.style.backgroundColor = "";
            // }, 500);
        }, false);
    }
}


function deleteSquares(){
    gridContainer.innerHTML = "";
}

//clear button setup
const clearBtn = document.createElement("button");
clearBtn.textContent = "clear box"
body.appendChild(clearBtn);
clearBtn.addEventListener("click",() => {
    clearGrid();
})

function clearGrid(){
    const squares = gridContainer.querySelectorAll('div');
    squares.forEach(element => {
        element.style.backgroundColor = "white";
    });
}

