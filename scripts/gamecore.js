var grid = new Array();
var cellWidth = 20;
var cellHeight = 20;
var columns;
var rows;
var winSequence;
var movesCount = 0;

function drawField(width, heigth) {

    columns =  width;
    rows = heigth;
    grid = createGrid(rows, columns);

    winSequence = getWinSequence(rows, columns);

    var canvasWidth = cellWidth * columns;
    var canvasHeight = cellHeight * rows;

    var canvas = document.getElementById('gameGrid');
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    var ctx = canvas.getContext('2d');
    drawGrid(ctx);

    function drawGrid(ctx) {
        ctx.beginPath();
        for (i = 0; i < columns; i++) {
            for (j = 0; j < rows; j++) {
                ctx.strokeRect(cellWidth * i, cellHeight * j, cellWidth, cellHeight);
            }
        }
        ctx.closePath();
    }
}

function createGrid(rows, columns) {
    var arr = new Array();
    for (var i = 0; i < columns; i++) {
        arr[i] = new Array();
        for (var j = 0; j < rows; j++) {
            arr[i][j] = 0;
        }
    }
    return arr;
}

function getWinSequence(rows, columns) {
    if (rows < 10 && columns < 10) {
        return 3;
    }
    return 5;
}

function showGrid() {
    var stringGrid = "";
    for (var i = 0; i < rows; i++) {
        stringGrid += "\n";
        for (var j = 0; j < columns; j++) {
            stringGrid+= grid[j][i] + " ";
        }
    }
    alert(stringGrid);
}

function placeFigure(event, turn) {
    var canvas = document.getElementById('gameGrid');
    var x = Math.floor((event.pageX - canvas.offsetLeft) / cellWidth);
    var y = Math.floor((event.pageY - canvas.offsetTop) / cellHeight);
    if (grid[x][y] == 0) {
        var player = checkTurn(turn);
        grid[x][y] = player;
        drawFigure(x, y, player);
        movesCount += 1;
        checkForWinner(player, x, y);
    }
    else {
        return;
    }  
}

function drawFigure(x, y, player) {
    var canvas = document.getElementById('gameGrid');
    var ctx = canvas.getContext("2d");
    if (player == 1) {
        drawX(x, y);
    }
    else {
        drawO(x, y);
    }
    function drawX(x, y) {
        ctx.moveTo(x * cellWidth, y * cellHeight);
        ctx.lineTo((x + 1) * cellWidth, (y + 1) * cellHeight);
        ctx.stroke();

        ctx.moveTo((x + 1) * cellWidth, y * cellHeight);
        ctx.lineTo(x * cellWidth, (y + 1) * cellHeight);
        ctx.stroke();
    }
    function drawO(x, y) {
        ctx.beginPath();
        ctx.arc((cellWidth * x) + (cellWidth / 2), (cellWidth * y) + (cellHeight / 2), 8, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.closePath()
    }
    
}

function checkForWinner(player, x, y) {
    checkColumns(player, x, y);
    checkRows(player, x, y);
    checkDiagonal(player, x, y);
    checkAntiDiagonal(player, x, y);
    checkDraw();

    function checkColumns(player, x, y) {
        var counter = 1;
        for (var i = y + 1; i <= y + winSequence - 1; i++) {
            if (i > rows - 1) {
                break;
            }
            if (grid[x][i] != player) {
                break;
            }
            counter++;
            if (counter == winSequence) {
                showWinner(player);
            }
        }
        for (var i = y - 1; i > y - winSequence - 1; i--) {
            if (i < 0) {
                break;
            }
            if (grid[x][i] != player) {
                break;
            }
            counter++;
            if (counter == winSequence) {
                showWinner(player);
            }
        }
    }

    function checkRows(player, x, y) {
        var counter = 1;
        for (var i = x + 1; i <= x + winSequence - 1; i++) {
            if (i > columns - 1) {
                break;
            }
            if (grid[i][y] != player) {
                break;
            }
            counter++;
            if (counter == winSequence) {
                showWinner(player);
            }
        }
        for (var i = x - 1; i > x - winSequence - 1; i--) {
            if (i < 0) {
                break;
            }
            if (grid[i][y] != player) {
                break;
            }
            counter++;
            if (counter == winSequence) {
                showWinner(player);
            }
        }
    }

    function checkDiagonal(player, x, y) {
        var counter = 1;
        var tmpX = x;
        var tmpY = y;
        for (var i = 0; i <= winSequence - 1; i++) {
            tmpX++;
            tmpY++;
            if (tmpX > columns - 1 || tmpY > rows - 1) {
                break;
            }
            if (grid[tmpX][tmpY] != player) {
                break;
            }
            counter++;
            if (counter == winSequence) {
                showWinner(player);
            }
        }

        tmpX = x;
        tmpY = y;
        for (var i = 0; i <= winSequence - 1; i++) {
            tmpX--;
            tmpY--;
            if (tmpX < 0 || tmpY < 0) {
                break;
            }
            if (grid[tmpX][tmpY] != player) {
                break;
            }
            counter++;
            if (counter == winSequence) {
                showWinner(player);
            }
        }
    }

    function checkAntiDiagonal(player, x, y) {
        var counter = 1;
        var tmpX = x;
        var tmpY = y;
        for (var i = 0; i <= winSequence - 1; i++) {
            tmpX++;
            tmpY--;
            if (tmpX > columns - 1 || tmpY < 0) {
                break;
            }
            if (grid[tmpX][tmpY] != player) {
                break;
            }
            counter++;
            if (counter == winSequence) {
                showWinner(player);
            }
        }

        tmpX = x;
        tmpY = y;
        for (var i = 0; i <= winSequence - 1; i++) {
            tmpX--;
            tmpY++;
            if (tmpX < 0 || tmpY > rows - 1) {
                break;
            }
            if (grid[tmpX][tmpY] != player) {
                break;
            }
            counter++;
            if (counter == winSequence) {
                showWinner(player);
            }
        }
    }

    function checkDraw() {
        if (movesCount == rows * columns) {
            showWinner(0);
        }
    }

}

function showWinner(player) {
    switch (player) {
        case 1: alert("Player X wins!");
            break;
        case 2: alert("Player O wins!");
            break;
        default: alert("Draw!");
            break;
    }
    movesCount = 0;
}

function checkTurn(turn) {
    if (turn % 2 == 0) {
        return 1;
    }
    else
        return 2;
}

