
var socket = io();

function setup() {

    var weath = 'summer'

    var matrix = [];
    var side = 30;

    // let grassCountElement = document.getElementById('grassCount');
    // let grassEaterCountElement = document.getElementById('grassEaterCount');
    // let eaterCountElement = document.getElementById('eaterCount');
    // let waterCountElement = document.getElementById('waterCount');
    // let wallCountElement = document.getElementById('wallCount');




    socket.on("data", drawCreatures);
    socket.on("weather", function (data) {
        weath = data;
    })

    function drawCreatures(data) {
        matrix = data.matrix
        // wallArr = data.wallArr
        // wallArr = data.wallArr
        // wallArr = data.wallArr
        // matrix = data.matrix;
        // grassCountElement.innerText = data.grassCounter;
        // grassEaterCountElement.innerText = data.grassEaterCounter;
        // eaterCountElement.innerText = data.eaterCounter;
        // waterCountElement.innerText = data.waterCounter;
        // wallCountElement.innerText = data.wallCounter;
        // frameRate(20);
        createCanvas(matrix[0].length * side, matrix.length * side);
        background('#acacac');


        for (var y = 0; y < matrix.length; y++) {
            for (var x = 0; x < matrix[y].length; x++) {

                if (matrix[y][x] == 1) {
                    if (weath == "spring") {
                        fill("#7ef500")
                    }
                    else if (weath == "summer") {
                        fill("green");
                    }
                    else if (weath == "winter") {
                        fill("#f8f7f7")
                    }
                    else if (weath == "autumn") {
                        fill("#cb5400")
                    }
                }
                else if (matrix[y][x] == 0) {
                    fill("#acacac");
                }
                else if (matrix[y][x] == 2) {
                    fill("yellow");
                }
                else if (matrix[y][x] == 3) {
                    fill("red");
                }
                else if (matrix[y][x] == 4) {
                    fill("black");
                }
                else if (matrix[y][x] == 5) {
                    fill("red");
                }
                else if (matrix[y][x] == 6) {
                    fill("blue");
                }
                rect(x * side, y * side, side, side);

            }
        }

        

    }
    
    
    
}
function mouseDragged() {
socket.on("wallData", (data)=> {


    console.log(data);
    
    wallArr = data.wallArr
    grassArr = data.grassArr
    grassEaterArr = data.grassEaterArr
    EaterArr = data.EaterArr
    waterArr = data.waterArr
    wallArr = data.wallArr
    matrix = data.matrix

    console.log('qwerty');
    var side = 30;
    
    let wallX = Math.floor(mouseX / side)
    let wallY = Math.floor(mouseY / side)
    if (wallY < 0 || wallY >= 80 || wallX < 0 || wallX >= 80) {
        return;
    }

    isWall = false
    for (let i in wallArr) {
        if (wallX == wallArr[i].x && wallY == wallArr[i].y && matrix[wallY][wallX] == 4) {
            isWall = true
            break
        }
    }
    if (isWall == false) {
        if (matrix[wallY][wallX] == 1) {
            for (let i in grassArr) {
                if (grassArr[i].x == wallX && grassArr[i].y == wallY) {
                    for (let i in grassArr) {
                        if (grassArr[i].x == wallX && grassArr[i].y == wallY) {
                            grassArr.splice(i, 1)
                        }
                    }
                }
            }
        }
        if (matrix[wallY][wallX] == 2) {
            for (let i in grassEaterArr) {
                if (grassEaterArr[i].x == wallX && grassEaterArr[i].y == wallY) {
                    for (let i in grassEaterArr) {
                        if (grassEaterArr[i].x == wallX && grassEaterArr[i].y == wallY) {
                            grassEaterArr.splice(i, 1)
                        }
                    }
                }
            }
        }
        if (matrix[wallY][wallX] == 3) {
            for (let i in EaterArr) {
                if (EaterArr[i].x == wallX && EaterArr[i].y == wallY) {
                    for (let i in EaterArr) {
                        if (EaterArr[i].x == wallX && EaterArr[i].y == wallY) {
                            EaterArr.splice(i, 1)
                        }
                    }
                }
            }
        }
        // if (matrix[wallY][wallX]==4){
        //     for (let i in poisonGrassArr){
        //         if (poisonGrassArr[i].x==wallX && poisonGrassArr[i].y==wallY) {
        //             for (let i in poisonGrassArr){
        //                 if (poisonGrassArr[i].x==wallX && poisonGrassArr[i].y==wallY) {
        //                     poisonGrassArr.splice(i,1)
        //                 }
        //             }
        //         }
        //     }
        // }
        if (matrix[wallY][wallX] == 6) {
            for (let i in waterArr) {
                if (waterArr[i].x == wallX && waterArr[i].y == wallY) {
                    for (let i in waterArr) {
                        if (waterArr[i].x == wallX && waterArr[i].y == wallY) {
                            waterArr.splice(i, 1)
                        }
                    }
                }
            }
        }
        socket.emit("wall", matrix);
        // wallArr.push(new Wall(wallX, wallY))
    }
    return false;

});
}
function kill() {
    socket.emit("kill")
}