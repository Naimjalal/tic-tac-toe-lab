/*-------------------------------- Constants -------------------------------*/
const winningCombos = [
   [0, 1, 2],
   [3, 4, 5],
   [6, 7, 8],
   [0, 3, 6],
   [1, 4, 7],
   [2, 5, 8],
   [0, 4, 8],
   [2, 4, 6]
 ];

/*---------------------------- Variables (state) ----------------------------*/
let board;
let turn;
let winner;
let tie;
let playerXName = 'Player X'; 
let playerOName = 'Player O';

/*------------------------ Cached Element References ------------------------*/

const squareEls = document.querySelectorAll('.sqr');
const messageEl = document.querySelector('#message');
const resetBtnEl = document.querySelector('#reset');
const playerInputSection = document.getElementById('player-input');
const playerXInput = document.getElementById('playerX');
const playerOInput = document.getElementById('playerO');
const startGameBtn = document.getElementById('startGameBtn');
const boardEl = document.querySelector('.board'); 
// console.log(squareEls);
// console.log(messageEl);
/*-------------------------------- Functions --------------------------------*/
const init = () => {
   board = ['','','','','','','','','']
   turn = 'X';
   winner= false;
   tie = false;
   render();
   boardEl.classList.add('disabled');
   // console.log('Init function called');
    // console.log(board);
    // console.log(turn)
    // console.log(winner)
    // console.log(tie)
}
const render = () => {
updateBoard();
updateMessage();
}
const updateBoard = ()=>{
board.forEach((value, index) =>{
   console.log(`Index: ${index}, Value: ${value}`);
   squareEls[index].textContent = value;
})
}
const updateMessage = () =>{
   if (!winner && !tie) {
      
      if (turn === 'X') {
          messageEl.textContent = `${playerXName}'s turn (X)`;
      } else {
          messageEl.textContent = `${playerOName}'s turn (O)`;
      }
  } else if (tie) {
      
      messageEl.textContent = "It's a tie!";
      messageEl.style.color = "red"
      boardEl.style.backgroundColor = "red";
  } else {
      
      if (turn === 'X') {
         boardEl.classList.add('disabled');
          messageEl.textContent = `Congratulations ${playerXName} wins!`;
          messageEl.style.color = "green"
          boardEl.style.backgroundColor = "lightgreen";
      } else {
         boardEl.classList.add('disabled');
          messageEl.textContent = `Congratulations ${playerOName} wins!`;
          messageEl.style.color = "green";
          boardEl.style.backgroundColor = "lightgreen";
      }
  }
}

const handleClick = (event) => {

   const squareIndex = event.target.id;
 
   if (board[squareIndex] !== '' || winner) return;
   placePiece(squareIndex);
   checkForWinner();
  checkForTie();
  switchPlayerTurn();
   render();
}
const placePiece = (index) => {
   board[index] = turn;
}
const checkForWinner = () => {
   winningCombos.forEach(combo =>{
      const [a, b, c] = combo;
      if (board[a] !== '' && board[a] === board[b] && board[a] === board[c]) {
         winner = true;
      }
   })
}
const checkForTie = () => {
   if (winner) return;
   if (board.includes('')) {
      tie = false;
   } else {
      tie = true; 
   }
   console.log('Tie status:', tie);
}
const switchPlayerTurn = () => {
if (winner) return;
if (turn === 'X') {
   turn = 'O';
 } else {
   turn = 'X';
 }
}

startGameBtn.addEventListener('click', () => {
   
   playerXName = playerXInput.value || 'Player X';  
   playerOName = playerOInput.value || 'Player O'; 
   
   
   playerInputSection.style.display = 'none';
   messageEl.textContent = `${playerXName}'s turn (X)`;
   boardEl.classList.remove('disabled'); 
   render();
 });

/*----------------------------- Event Listeners -----------------------------*/
squareEls.forEach((square) => {
   square.addEventListener('click', handleClick);
});

// Reset the game
resetBtnEl.addEventListener('click', () => {
    playerInputSection.style.display = 'block';
   messageEl.textContent = "Enter Player Names to Start";
   boardEl.style.backgroundColor = "white";
   messageEl.style.color = "black"
   boardEl.classList.add('disabled'); 
   init();
 });
 init();


