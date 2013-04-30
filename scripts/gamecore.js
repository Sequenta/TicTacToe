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

