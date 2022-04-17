
const BORDER_STYLE = "0.01px solid";
const DEFAULT_GRID_SIZE = 16;
const DEFAULT_PEN_COLOR = "black";
const DEFAULT_GRID_COLOR = "";
const DEFAULT_GRID_LINES_ON = new Boolean(true);

let gridLinesOn = DEFAULT_GRID_LINES_ON;
let penColor = DEFAULT_PEN_COLOR;
let gridColor = DEFAULT_GRID_COLOR;
let currentGridSize = DEFAULT_GRID_SIZE;
let mode = "snake";//custom, random, grayscale, snake

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

        square.addEventListener("mouseenter", drawGrid);
    };
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
                if (currentOpacity <= 0.9) {
                    this.style.backgroundColor = `rgba(0, 0, 0, ${currentOpacity + 0.1})`;
                }
            } 
            else if (this.style.backgroundColor == 'rgb(0, 0, 0)')
                return;
            else 
                this.style.backgroundColor = 'rgba(0, 0, 0, 0.1)';  
                break;

        case("snake"):
            this.style.backgroundColor = penColor;
            setTimeout(()  => {
                this.style.backgroundColor = "";
            }, 500);
    }
}


function deleteSquares(){
    gridContainer.innerHTML = "";
}

function getRandomColor(){
   return "#"+Math.floor(Math.random()*16777215).toString(16);
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
    rgb = [255,255,255];
}

