const grids=document.querySelectorAll(".grid")
const wincase=document.querySelector("#wincase")
const player1=document.querySelector("#Player1")
const player2=document.querySelector("#Player2")
const restartButton = document.querySelector(".Restrat");
const startButton = document.querySelector(".start");

const winconditio=[
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
let options = ["", "", "", "", "", "", "", "", ""];
let players = [];
let currentPlayerIndex = 0;//intial plyer
let running = false;

startButton.addEventListener("click", startgame);

const createPlayer = (playerName, mark) => {
    return {playerName, mark}
}



function startgame(){
    players=[
        createPlayer(player1.value,"X"),
        createPlayer(player2.value,"O")
    ]
    running=true;
    grids.forEach(grid=>grid.addEventListener("click",gridClicked));
    restartButton.addEventListener("click", restartGame);
    wincase.textContent = `${players[currentPlayerIndex].playerName}'s turn`;
}



function gridClicked() {
    const cellIndex = this.getAttribute("cellIndex");
    if(options[cellIndex] != "" || !running){
        return;
    }
    updateGrid(this, cellIndex);
    checkWinner();
}

function updateGrid(grid, index) {
    options[index] = players[currentPlayerIndex].mark;
    grid.textContent = players[currentPlayerIndex].mark;
}


function playerChange() {
    currentPlayerIndex = (currentPlayerIndex == 0)? 1 : 0;
    wincase.textContent = `${players[currentPlayerIndex].playerName}'s turn`;
}




  function checkWinner(){
    let won=false;
    for(let win=0;win<winconditio.length;win++){
        let condition=winconditio[win];
        let gridA=options[condition[0]];
        let gridB=options[condition[1]];
        let gridC=options[condition[2]];
        if(gridA == "" || gridB == "" || gridC == ""){
            continue;
        }
        if(gridA == gridB && gridB == gridC){
            won = true;
            break;
        }
    }
    if(won){
        wincase.textContent=`${players[currentPlayerIndex].playerName} wins`
        running = false;
    }else if(!options.includes("")){
        wincase.textContent = "Oops! It's a Draw";
        running = false;
    }else{
        playerChange();
    }
};

function restartGame() {
    currentPlayerIndex = 0;
    options = ["", "", "", "", "", "", "", "", ""];
    wincase.textContent = `${players[currentPlayerIndex].playerName}'s turn`;
    grids.forEach(grid => grid.textContent = "");
    running = true;
}