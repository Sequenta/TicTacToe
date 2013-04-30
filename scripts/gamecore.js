function drawField(width,heigth) {

    //TODO: check width and height
    var cellWidth = 20;
    var cellHeight = 20
    var columns =  width;
    var rows = heigth;

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
    alert("Field parameters:\n width " + width + "\n heigth:" + heigth);
}

function placeFigure(event,turn) {
    if (turn % 2 == 0) {
        alert("X");
    }
    else
        alert("O");
}

