import Player from './player.js';
import Board from './board.js';

const Game = (function() {
    const playerOne = Player('X');
    const playerTwo = Player('O');
    let commentary = document.getElementsByClassName('commentary')[0];
    let lockBoard = false;
    const init = () => {
        Board.init();
        commentary.textContent = getCommentary();
        document.getElementsByClassName('tic-tac-toe')[0].addEventListener('click', e => {
            commentary.textContent = getCommentary();
            if(gameOver() && !lockBoard) {
                if(getWinner() === 'Player 1') {
                    playerOne.win();
                    document.getElementsByClassName('score-x')[0].textContent = playerOne.getWinCount();
                } else {
                    playerTwo.win();
                    document.getElementsByClassName('score-o')[0].textContent = playerTwo.getWinCount();
                }
                lockBoard = true;
            }
        })
        document.getElementsByClassName('new-game')[0].addEventListener('click', e => {
            Board.reset();
            lockBoard = false;
            commentary.textContent = getCommentary();
        })
    }
    const gameOver = () => {
        const playerOneVictory = Board.checkVictory(playerOne.getSymbol());
        const playerTwoVictory = Board.checkVictory(playerTwo.getSymbol());
        return playerOneVictory || playerTwoVictory;
    } 
    const getWinner = () => {
        const playerOneVictory = Board.checkVictory(playerOne.getSymbol());
        if(playerOneVictory) return 'Player 1';
        return 'Player 2';
    };
    const getCommentary = () => {
        if(gameOver()) {
            return getWinner() + ' is the winner!';
        }
        if(Board.getTurn() % 2 === 0) {
            return "It is Player 1's turn.";
        }
        return "It is Player 2's turn.";
    }
    return { init }
})();

export default Game;