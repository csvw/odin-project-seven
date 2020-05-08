const Player = (boardSymbol) => {
    const symbol = boardSymbol;
    let wins = 0;
    const win = () => { ++wins; }
    const getWinCount = () => wins;
    const getSymbol = () => symbol;
    return { win, getWinCount, getSymbol, }
}

export default Player;