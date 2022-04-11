let gameOver = false
const player1 = "X";
const player2 = "O";
let playerArray=[player1,player2];
let onePlayer=false;
let twoPlayers=false;


const winningCombos = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]

let board = {
    "0": false,
    "1": false,
    "2": false,
    "3": false,
    "4": false,
    "5": false,
    "6": false,
    "7": false,
    "8": false,
}

const playerOneText = document.getElementById("playerOne");
const submit = document.getElementById("submit");
const name = document.getElementById("userName");
const playerTwoText = document.getElementById("playerTwo");
let clickCounter = 0
let name1 ="";
let name2="";
let currentPlayer = "";
const computerBtn = document.getElementById("computer");
const box = document.getElementsByClassName("box");
const textChange = document.getElementById("changingText");
const playAgain = document.getElementById("playAgain");
let originalText = textChange.innerHTML

let xArray= [];
let oArray= [];


submit.addEventListener("click", twoPlayerGame);
computerBtn.addEventListener("click", onePlayerGame);
playAgain.addEventListener("click", reset);


//TWO MAIN FUNCTIONS
function twoPlayerGame () {
    submit.innerText = "Submit Name";
    computerBtn.style.visibility = "hidden";
    submit.addEventListener("click", assignName)
    if (name1 !== "") {
      for (let i = 0; i < box.length; i++) {
        selectedBox = box[i]
        selectedBox.addEventListener("click", playerMove);
      }
    }
}

function onePlayerGame () {
    submit.removeEventListener("click", twoPlayerGame);
    submit.innerText = "Submit Name";
    submit.addEventListener("click", assignNameOnePlayer);
    computerBtn.style.visibility = "hidden";
        for (let i = 0; i < box.length; i++) {
            let selectedBox = box[i]
            selectedBox.addEventListener("click", playerMoveOnePlayer);
        }
}


//FUNCTIONS USED IN twoPlayerGame 

function firstPlayer () {
    let randomNumber= Math.round(Math.random());
    currentPlayer = playerArray[randomNumber]; 
    //console.log (currentPlayer)
    if (currentPlayer === player1) {
         textChange.innerText = `Player 1 will go first. It is ${name1}'s turn.`;
    } else {
        textChange.innerText = `Player 2 will go first. It is ${name2}'s turn.`;
    }
    if (randomNumber === 1) { 
         let secondName = playerArray[1];
        playerArray.unshift(secondName);
        playerArray.pop();
    }
    return playerArray, currentPlayer;
}

function assignName () {
    if (document.getElementById("userName").value !== '') {
        if (clickCounter == 0) {
            name1 = document.getElementById("userName").value;
            playerOneText.innerText = `Player 1: ${name1}`;
            document.getElementById("userName").value = '';
            if (name2 !== "Computer") {
                document.getElementById("userName").placeholder = "Player 2 Name";
            }
            clickCounter++;
        }
        else if (clickCounter == 1) {
            name2 = document.getElementById("userName").value;
            playerTwoText.innerText = `Player 2: ${name2}`;
            document.getElementById("userName").placeholder = '';
        
            submit.removeEventListener("click", assignName); //THIS STILL LETS YOU UPDATE AFTER 2 clicks
            document.getElementById("userName").value = '';
            firstPlayer ();
            return name1, name2;
        }
    }
}

function switchPlayers () {
    let secondName = playerArray[1];
    playerArray.unshift(secondName);
    playerArray.pop();
    currentPlayer = playerArray[0]
    if (currentPlayer === player1) {
        textChange.innerText = `${name1}'s turn`;
    } else {
        textChange.innerText = `${name2}'s turn`;
    }
    return playerArray;
    /// NEED TO DO make sure it only changes if they click an empty square and make a move, either cancel event or change text again once draw or player wins
  }

function playerMove (e) {
    let clickedBox = e.target.id; 
    if (board[clickedBox] == false) { 
            document.getElementById(`${clickedBox}`).innerText = `${currentPlayer}`;
            board[clickedBox] = true; 
            createArrays (e);
            checkConditions ();
            if (gameOver !== true) {
                switchPlayers();
            }
    }
}

function createArrays (e) {
        if (currentPlayer === player1) {
            let clickedBoxIndex = parseInt(e.target.id);
            xArray.push(clickedBoxIndex);
            console.log(xArray)
        } else if (currentPlayer === player2) {
            let clickedBoxIndex = parseInt(e.target.id);
            oArray.push(clickedBoxIndex);
            console.log(oArray)
        }
    }



//FUNCTIONS USED IN onePlayerGame
function assignNameOnePlayer () {
        name2 = "Computer"
        playerTwoText.innerText = `Player 2: ${name2}`;
        name1 = document.getElementById("userName").value;
        playerOneText.innerText = `Player 1: ${name1}`;
        document.getElementById("userName").value = '';
        submit.removeEventListener("click", assignNameOnePlayer);
        firstPlayerComputer()
}

function firstPlayerComputer () {
  
  let randomNumber= Math.round(Math.random());
  let first = playerArray[randomNumber];
  if (first === player2) {
    textChange.innerText = "Computer will go first"
      computerTurn ()
      checkConditions ();
      switchPlayersOnePlayer ();
   } else if (first === player1 && name1 !== "") {
    textChange.innerHTML = `${name1} go first`;
   }
} 

function switchPlayersOnePlayer () {
        let secondName = playerArray[1];
        playerArray.unshift(secondName);
        playerArray.pop();
        currentPlayer = playerArray[0]
        return playerArray;
}

function playerMoveOnePlayer (e) {
       //need to allow player 1 vs 2 to go first
       textChange.innerText = originalText;
            let clickedBox = e.target.id;
            if (board[clickedBox] == false) { 
                document.getElementById(`${clickedBox}`).innerText = `${player1}`;
                let clickedBoxIndex = parseInt(e.target.id);
                xArray.push(clickedBoxIndex);
                board[clickedBox] = true; 
                let newPlayers = switchPlayersOnePlayer();
                playerArray = newPlayers;
                checkConditions ();
                if (gameOver === false) {
                    computerTurn ()
                    checkConditions ();
                }
            
            }
          
}

function computerTurn () {
    let keyArray = [];

    for (key in board) {
        keyArray.push(key);
    }

    for (let i = keyArray.length -1; i>0;i--) {
        let randomNum=Math.floor(Math.random()*(i+1));
        let original = keyArray[i];
        keyArray[i] = keyArray[randomNum];
        keyArray[randomNum] = original;
    }
    
    for (let objectArrayIndex = 0; objectArrayIndex< keyArray.length; objectArrayIndex++) {
        let item = keyArray[objectArrayIndex]
        let objectArrayIndexString = item.toString();
        if (board[objectArrayIndexString] === false){
            document.getElementById(`${objectArrayIndexString}`).innerText = "O";
            board[objectArrayIndexString] = true;
            let keyToInt = parseInt(item);
            oArray.push(keyToInt);
            return
        }
  }
    
}  

//FUNCTIONS USED IN BOTH
function checkConditions () {
  for (let x = 0; x < winningCombos.length; x++ ) {
     let winningComboItems = winningCombos[x];
     let a = winningComboItems[0];
     let b = winningComboItems[1];
     let c = winningComboItems[2];
     if (xArray.includes(a) === true && xArray.includes(b) === true && xArray.includes(c) === true){
         textChange.innerText = `${name1} wins!`;
          gameOver = true;
          removeEventsAtEnd ()
     } else if (oArray.includes(a) === true && oArray.includes(b) === true && oArray.includes(c) === true){
         textChange.innerText = `${name2} wins!`;
          gameOver = true;
          removeEventsAtEnd ()
     }
     checkForADraw ();
  }
}

function removeEventsAtEnd (){
  for (let i = 0; i < box.length; i++) {
      selectedBox = box[i];
      selectedBox.removeEventListener("click", switchPlayers);
      selectedBox.removeEventListener("click", playerMove);
      selectedBox.removeEventListener("click", playerMoveOnePlayer)
      playAgain.style.visibility = "visible";
    }
}

function checkForADraw () {
if (gameOver == false) {
  let counter = 0
  for (key in board) {
      if (board[key] === true) {
          counter++
      }
  }
  if (counter === 9) {
    gameOver = true;
   textChange.innerText = `It's a draw`;
   removeEventsAtEnd ()
  }
}
}

function reset() {
  for (key in board) {
      board[key] = false;
      document.getElementById(`${key}`).innerText = '';
  }
  onePlayer=false;
  twoPlayers=false;
  gameOver =false
  clickCounter = 0;
  name1 = "";
  name2 = "";
  playerArray=[player1,player2];
  xArray= [];
  oArray= [];
  document.getElementById("userName").placeholder = "Player 1 Name";
  playerOneText.innerText = "Player 1:";
  playerTwoText.innerText = "Player 2:";
  submit.innerText = "2 Player Game";
  textChange.innerHTML = originalText;
  playAgain.style.visibility = "hidden";
  computerBtn.style.visibility = "visible";
  submit.addEventListener("click", twoPlayerGame);
}
