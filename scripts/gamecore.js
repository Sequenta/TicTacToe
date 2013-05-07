var grid = new Array();
var cellWidth = 20;
var cellHeight = 20;
var columns;
var rows;
var winSequence;

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
        drawFigure(x,y,player);
        checkForWinner(player,x,y);
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
    checkColumns(player, x);
    checkRows(player, y);
    checkDiagonal(player);
    checkAntiDiagonal(player);

    function checkColumns(player, x) {
        for (var i = 0; i < winSequence; i++) {
            if (grid[x][i] != player)
                break;
            if (i == winSequence - 1) {
                showWinner(player);
            }
        }
    }

    function checkRows(player, y) {
        for (var i = 0; i < winSequence; i++) {
            if (grid[i][y] != player)
                break;
            if (i == winSequence - 1) {
                showWinner(player);
            }
        }
    }

    function checkDiagonal(player) {
        if (x == y) {
            for (var i = 0; i < winSequence; i++) {
                if (grid[i][i] != player)
                    break;
                if (i == winSequence - 1) {
                    showWinner(player);
                }
            }
        }
    }

    function checkAntiDiagonal(player) {
        for (var i = 0; i < winSequence; i++) {
            if (grid[i][(winSequence - 1) - i] != player)
    			break;
            if (i == winSequence - 1) {
    		    showWinner(player);
            }
        }
    }
}

function showWinner(player) {
    alert(player);
    drawField(columns, rows)
}

function checkTurn(turn) {
    if (turn % 2 == 0) {
        return 1;
    }
    else
        return 2;
}

