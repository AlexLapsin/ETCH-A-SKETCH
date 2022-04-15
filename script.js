const squareNum = 256;
const borderStyle = "0.1px groove black";
let withBorder = true;
let squareCol = "black";
let backgroundCol = "";

const body = document.querySelector('body');
const container = document.createElement('div');

//color picker
const colorPicker = document.querySelector("#square-color");
colorPicker.addEventListener("change", (e) => {
    squareCol = e.target.value;
}, false);

// //grid lines on/off
// const gridLines = document.querySelector("#checkbox");
// gridLines.addEventListener("change", (e) => {
//     if(e.target.checked) 
//         withBorder === true;
//     else 
//         withBorder === false;
// })

//create the container that stores the squares
container.classList.add("grid-container");
body.appendChild(container);

//create squares
for(i=0; i<squareNum; i++){
    const square = document.createElement('div');
    square.classList.add("square"+i);
    square.style.cssText = "display:flex; box-sizing:border-box; width:50px; height:50px; margin:0.5px;"
    if(withBorder) {square.style.border = borderStyle;}
    container.appendChild(square);

    square.addEventListener("mouseenter", (e) => {
        // highlight the mouseenter target
        e.target.style.backgroundColor = squareCol;
        
        // // reset the color after a short delay (for snake)
        // setTimeout(function() {
        // e.target.style.backgroundColor = "";
        // }, 500);
    }, false);
}


//clear button setup
const clearBtn = document.createElement("button");
clearBtn.textContent = "clear box"
body.appendChild(clearBtn);
clearBtn.addEventListener("click",() => {
    clearGrid();
})

function clearGrid(){
    const squares = container.querySelectorAll('div');
    squares.forEach(element => {
        element.style.backgroundColor = "white";
    });
}

