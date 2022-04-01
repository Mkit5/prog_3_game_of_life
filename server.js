
weath = "summer"



var Grass = require("./modules/Grass.js");
var GrassEater = require("./modules/GrassEater.js");
let random = require('./modules/random');
var Eater = require("./modules/Eater.js")
var Water = require("./modules/Water.js")
var Wall = require("./modules/Wall.js")






grassArr = [];
grassEaterArr = [];
// var poisonGrassArr = [];
EaterArr = [];
wallArr = [];
waterArr = [];
matrix = [];

var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
app.use(express.static("."));
let fs = require('fs')
app.get('/', function (req, res) {
    res.redirect('index.html');
});
server.listen(3000);



function matrixGenerator(matrixSize, grassCount, grassEaterCount, EaterCount, WaterCount) {
    for (let i = 0; i < matrixSize; i++) {
        matrix[i] = []
        for (let o = 0; o < matrixSize; o++) {
            matrix[i][o] = 0;
        }
    }
    for (let i = 0; i < grassCount; i++) {
        let x = Math.floor(random(matrixSize));
        let y = Math.floor(random(matrixSize));
        matrix[y][x] = 1;
    }
    for (let i = 0; i < grassEaterCount; i++) {
        let x = Math.floor(random(matrixSize));
        let y = Math.floor(random(matrixSize));
        matrix[y][x] = 2;
    }
    // for (let i = 0; i < poisonGrassCount; i++) {
    //     let x = Math.floor(random(matrixSize));
    //     let y = Math.floor(random(matrixSize));
    //     matrix[y][x] = 3;
    // }
    for (let i = 0; i < EaterCount; i++) {
        let x = Math.floor(random(matrixSize));
        let y = Math.floor(random(matrixSize));
        matrix[y][x] = 4;
    }
    for (let i = 0; i < WaterCount; i++) {
        let x = Math.floor(random(matrixSize));
        let y = Math.floor(random(matrixSize));
        matrix[y][x] = 6;
    }
return matrix

}
matrixGenerator(60, 40, 10, 5, 10)




function weather() {
    if (weath == "winter") {
        weath = "spring"
    }
    else if (weath == "spring") {
        weath = "summer"
    }
    else if (weath == "summer") {
        weath = "autumn"
    }
    else if (weath == "autumn") {
        weath = "winter"
    }
    io.sockets.emit('weather', weath)
}
setInterval(weather, 5000);



function creatingObjects() {
    for (let y = 0; y < matrix.length; y++) {
        for (let x = 0; x < matrix[y].length; x++) {

            if (matrix[y][x] == 1) {
                let gr = new Grass(x, y);
                grassArr.push(gr);
            }
            else if (matrix[y][x] == 2) {
                let eater = new GrassEater(x, y);
                grassEaterArr.push(eater);
            }
            // else if (matrix[y][x] == 3){
            //     let eater = new poisonGrass(x, y);
            //     poisonGrassArr.push(eater);
            // }
            else if (matrix[y][x] == 4) {
                let eater = new Eater(x, y);
                EaterArr.push(eater);
            }
            else if (matrix[y][x] == 6) {
                let eater = new Water(x, y);
                waterArr.push(eater);
            }

        }

    }


}


function wall(data) {
  // matrix[data.wallY][data.wallX] = 0
  for (let y = 0; y < matrix.length; y++) {
    for (let x = 0; x < matrix[y].length; x++) {
      // console.log(matrix[y][x]);
      if(matrix[y][x] == 6) {
      //   matrix[y] == data.wallY - 1 && matrix[x] == data.wallX - 1
      // matrix[y][x] = 5
      //   console.log(data);
        let eater = new Wall(data.wallX, data.wallY);
        wallArr.push(eater);
      }
    }
  }
}






function game() {

    for (let i = 0; i < grassArr.length; i++) {
        const grass = grassArr[i];
        grass.mul();
    }
    for (let i = 0; i < grassEaterArr.length; i++) {
        const grasseater = grassEaterArr[i];
        grasseater.eat();
    }


    // for (let i = 0; i < poisonGrassArr.length; i++) {

    //     const poison =poisonGrassArr[i];
    //     poison.mul();

    // }
    for (let i = 0; i < EaterArr.length; i++) {
        const Eater = EaterArr[i];
        Eater.eat();
    }
    for (let i = 0; i < waterArr.length; i++) {
        const water = waterArr[i];
        water.create();
    }





    let sendData = {
        matrix: matrix,
        grassCounter: grassArr.length,
        grassEaterCounter: grassEaterArr.length,
        EaterCounter: EaterArr.length,
        WaterCounter: waterArr.length,
        WallCounter: wallArr.length,
        grassArr:grassArr,
        grassEaterArr:grassEaterArr,
        EaterArr:EaterArr,
        waterArr:waterArr,
        wallArr:wallArr
    }


    io.sockets.emit("data", sendData);

    io.sockets.emit("wallData", sendData);


}
setInterval(game, 500)



function kill() {

    grassArr = [];
    grassEaterArr = [];
    // poisonGrassArr = [];
    EaterArr = [];
    wallArr = [];
    waterArr = [];


    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            matrix[y][x] = 0;
        }
    }

}

io.on('connection', function (socket) {
    creatingObjects();
    socket.on("kill", kill);
    socket.on("wall", wall);
});

// function Restart() {

//     grassArr = [];
//     grassEaterArr = [];
//     // poisonGrassArr = [];
//     EaterArr = [];
//     wallArr = [];
//     waterArr = [];


//     for (var y = 0; y < matrix.length; y++) {
//         for (var x = 0; x < matrix[y].length; x++) {
//             matrix[y][x] = 0;
//         }
//     }
//     matrixGenerator(60, 40, 10, 5, 10);
//     game();


// }

// io.on('connection', function (socket) {
//     matrixGenerator(60, 40, 10, 5, 10)
//     game();
//     creatingObjects();
//     socket.on("restart", Restart);
// });



// function mousedreggig(data) {
//     console.log(data);

//     wallArr.push(new Wall(wallX, wallY))
// }

// io.sockets.emit("wallData", mousedreggig);




var statistics = {};

setInterval(function () {
    statistics.grass = grassArr.length;
    statistics.grassEater = grassEaterArr.length;
    statistics.Eater = EaterArr.length;
    statistics.wall = wallArr.length;
    statistics.water = waterArr.length;

    fs.writeFile("statistics.json", JSON.stringify(statistics), function () {
    })
}, 1000)
