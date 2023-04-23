const congratz = document.getElementsByClassName('congatrulations')[0];
const turn = document.getElementsByClassName("turn")[0];
const player = document.querySelector(".player");
const el = document.querySelectorAll(".pad");

let playA = true;

function play(pad) {
    console.log(pad.innerText)
    if (pad.innerText == "") {
        if (playA) {
            pad.innerText = "X";
        } else if (!playA) {
            pad.innerText = "O";

        }
        if (verifyIfSomeoneWins(playA)) {
            let win = () => {
                congratz.style.animationName = "example";
                congratz.style.visibility = "visible";
                if (playA) {
                    console.log("X ganhou!")
                    document.getElementById("congratz").innerHTML = "<p>Player X Rocks!</p>";
                } else {
                    console.log("0 ganhou");
                    congratz.style.animationName = "example";
                    congratz.style.visibility = "visible";
                    document.getElementById("congratz").innerHTML = "<p>Player O Rocks!</p>";
                }
            };
            win();
        }
        playA = !playA;
        turnDisplayer();
    }
}

function turnDisplayer() {
    if (playA) {
        turn.innerText = "Player X's turn";
    } else {
        turn.innerText = "Player O's turn";
    }
}

let padArray = [];
function verifyIfSomeoneWins(player) {
    padArray = [];
    el.forEach(i => padArray.push(i.innerText));
    console.log(padArray);
    let wins = false;
    wins = verifyRow(player);
    if (wins)
        return true;
    wins = verifyColumn(player);
    if (wins)
        return true;
    wins = verifyDiagonal(player);
    if (wins)
        return true;
    return false;
}

function verifyRow(player) {

    winnerStrategy.setStrategy(new ROW());
    return winnerStrategy.apply(player);
}

function verifyColumn(player) {

    winnerStrategy.setStrategy(new COLUMN());
    return winnerStrategy.apply(player);
}

function verifyDiagonal(player) {
    winnerStrategy.setStrategy(new DIAGONAL());
    return winnerStrategy.apply(player);
}

class WinnerStrategy {
    constructor() {
        this.strategy = "";
    }
    setStrategy(strategy) {
        this.strategy = strategy;
    }
    apply(player) {
        return this.strategy.verify(player);
    }
}


class ROW {
    constructor() {
        this.playerSimbol = function (player) {
            if (player)
                return "X"
            else
                return "O"
        };

        this.verify = function (player) {
            let symbol = this.playerSimbol(player);
            for (let i = 0; i < padArray.length; i += 3) {
                if (padArray[i] === symbol && padArray[i] === padArray[i + 1] && padArray[i] === padArray[i + 2]) {
                    return true;
                }
            };
            return false;
        }
    }
}

class COLUMN {
    constructor() {
        this.playerSimbol = function (player) {
            if (player)
                return "X"
            else
                return "O"
        };

        this.verify = function (player) {
            let symbol = this.playerSimbol(player);
            for (let i = 0; i < 3; i++) {
                if (padArray[i] === symbol && padArray[i] === padArray[i + 3] && padArray[i] === padArray[i + 6]) {
                    return true;
                }
            };
            return false;
        }
    }
}

class DIAGONAL {
    constructor() {
        this.playerSimbol = function (player) {
            if (player)
                return "X"
            else
                return "O"
        };

        this.verify = function (player) {
            let symbol = this.playerSimbol(player);
            if (padArray[0] === symbol && padArray[0] === padArray[4] && padArray[0] === padArray[8]) {
                return true;
            } else if (padArray[2] === symbol && padArray[2] === padArray[4] && padArray[2] === padArray[6]) {
                return true;
            } else {
                return false;
            }
        };

    }
}

function restart() {
    el.forEach(i => i.innerText = "");
    playA = true;
    congratz.style.visibility = "collapse";
    congratz.style.animationName = "";
    turnDisplayer();
}

let winnerStrategy = new WinnerStrategy();
el.forEach(i => i.addEventListener("click", function (event) {
    play(event.target)
}, false));