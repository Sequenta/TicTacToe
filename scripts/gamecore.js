var grid = new Array();
var cellWidth = 20;
var cellHeight = 20;
var columns;
var rows;

function drawField(width, heigth) {

    //TODO: check width and height
    columns =  width;
    rows = heigth;
    grid = createGrid(rows, columns);

    var canvasWidth = cellWidth * columns;
    var canvasHeight = cellHeight * rows;

    var canvas = document.getElementById('gameGrid');
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    var ctx = canvas.getContext('2d');
    drawGrid(ctx);
    showGrid();

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
    var x = Math.floor((event.pageX - canvas.offsetLeft) / 20);
    var y = Math.floor((event.pageY - canvas.offsetTop) / 20);
    if (turn % 2 == 0) {
        alert("X was placed on cell(" + x + "," + y + ")");
    }
    else
        alert("O was placed on cell(" + x + "," + y + ")");
}

