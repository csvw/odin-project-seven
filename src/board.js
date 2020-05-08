const Board = (function() {
    let initialized = false;
    const ticTacToe = document.getElementsByClassName('tic-tac-toe')[0];
    const rows = [];
    let turn = 0;
    let gameOver = false;
    for(let i = 0; i < 3; i++) {
        const row = [];
        for(let j = 0; j < 3; j++) {
            let tile = document.createElement('div');
            tile.classList.add('tile');
            tile.classList.add('flex-row');
            tile.classList.add('flex-center');
            tile.addEventListener('click', e => {
                if(tile.textContent === '' && !gameOver) {
                    if(turn % 2 == 0) {
                        tile.textContent = 'X';
                    } else {
                        tile.textContent = 'O';
                    }
                    ++turn;
                    if(checkVictory('X')) gameOver = true;
                    if(checkVictory('O')) gameOver = true;
                }
            })
            row.push(tile);
        }
        rows.push(row);
    }

    const reset = () => {
        gameOver = false;
        turn = 0;
        for(let row of rows) {
            for(let tile of row) {
                tile.textContent = '';
            }
        }
    }

    const init = () => {
        if(!initialized) {
            initialized = true;
            for(let row of rows) {
                for(let tile of row) {
                    ticTacToe.appendChild(tile);
                }
            }
        }
    }

    const checkRows = (symbol) => {
        for(let row of rows) {
            let victory = true;
            for(let tile of row) {
                if(tile.textContent !== symbol) {
                    victory = false;
                }
            }
            if(victory) return victory;
        }
        return false;
    }

    const checkCols = (symbol) => {
        let c1 = true;
        let c2 = true;
        let c3 = true;
        for(let row of rows) {
            if(row[0].textContent !== symbol) c1 = false;
            if(row[1].textContent !== symbol) c2 = false;
            if(row[2].textContent !== symbol) c3 = false;
        }
        return c1 || c2 || c3;
    }

    const checkDiagonals = (symbol) => {
        let d1 = (
            rows[0][0].textContent === symbol &&
            rows[1][1].textContent === symbol &&
            rows[2][2].textContent === symbol
        )
        let d2 = (
            rows[2][0].textContent === symbol &&
            rows[1][1].textContent === symbol &&
            rows[0][2].textContent === symbol
        )
        return d1 || d2;
    }

    const checkVictory = (symbol) => {
        if(checkRows(symbol)) return true;
        if(checkCols(symbol)) return true;
        if(checkDiagonals(symbol)) return true;
        return false;
    }

    const getTurn = () => turn;

    return { init, checkVictory, getTurn, reset }
})();

export default Board;