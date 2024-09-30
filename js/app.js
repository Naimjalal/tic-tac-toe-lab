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


/*------------------------ Cached Element References ------------------------*/
const squareEls = document.querySelectorAll('.sqr');
const messageEl = document.querySelector('#message');
const resetBtnEl = document.querySelector('#reset')

/*-------------------------------- Functions --------------------------------*/
const init = () => {
   board = ['','','','','','','','','']
   turn = 'X';
   winner= false;
   tie = false;
   render();
}
const render = () => {
updateBoard();
updateMessage();
}
const updateBoard = ()=>{
board.forEach((value, index) =>{
   squareEls[index].textContent = value;
})
}
const updateMessage = () =>{
   if (!winner && !tie){
      messageEl.textContent = `Player ${turn}'s turn`;
   }else if (tie){
      messageEl.textContent= "Its a tie"
   }else{
      messageEl.textContent = `Congratulations Player ${turn} wins`;
   }
}

const handleClick = (event) => {

   const square = event.target;
   const squareIndex = square.id;
 
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
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
         winner = true;
      }
   })
}
const checkForTie = () => {
   if (winner) return;
   tie = board.every(square => square !== '');
}
const switchPlayerTurn = () => {
if (winner) return;
if (turn === 'X') {
   turn = 'O';
 } else {
   turn = 'X';
 }
}


/*----------------------------- Event Listeners -----------------------------*/
squareEls.forEach(square => square.addEventListener('click', handleClick));

resetBtnEl.addEventListener('click', init);

init();
