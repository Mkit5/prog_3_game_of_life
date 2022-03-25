// var matrix = [];
// var side = 10;
// var grassArr = [];
// var grassEaterArr = [];
// var poisonGrassArr = [];
// var EaterArr = [];
// var wallArr = [];
// var waterArr = [];


function setup() {

    var weath = 'summer'
    var socket = io();

    var matrix = [];
    var side = 10;






    let grassCountElement = document.getElementById('grassCount');
    let grassEaterCountElement = document.getElementById('grassEaterCount');
    let eaterCountElement= document.getElementById('eaterCount');
    let waterCountElement= document.getElementById('waterCount');
    let wallCountElement= document.getElementById('wallCount');
    // function matrixGenerator(matrixSize, grassCount, grassEaterCount,EaterCount,WaterCount){
    //     for (let i = 0; i < matrixSize; i++) {
    //         matrix[i] = []
    //         for (let o = 0; o < matrixSize; o++) { 
    //             matrix[i][o] = 0;
    //         }
    //     }
    //     for (let i = 0; i < grassCount; i++) {
    //         let x = Math.floor(random(matrixSize));
    //         let y = Math.floor(random(matrixSize));
    //         matrix[y][x] = 1;
    //     }
    //     for (let i = 0; i < grassEaterCount; i++) {
    //         let x = Math.floor(random(matrixSize));
    //         let y = Math.floor(random(matrixSize));
    //         matrix[y][x] = 2;
    //     }
    //         // for (let i = 0; i < poisonGrassCount; i++) {
    //         //     let x = Math.floor(random(matrixSize));
    //         //     let y = Math.floor(random(matrixSize));
    //         //     matrix[y][x] = 3;
    //         // }
    //         for (let i = 0; i < EaterCount; i++) {
    //             let x = Math.floor(random(matrixSize));
    //             let y = Math.floor(random(matrixSize));
    //             matrix[y][x] = 4;
    //         }
    //         for (let i = 0; i < WaterCount; i++) {
    //             let x = Math.floor(random(matrixSize));
    //             let y = Math.floor(random(matrixSize));
    //             matrix[y][x] = 6;
    //         }
           
        
    // }
    // matrixGenerator(80, 40, 10,5,10)
    
    frameRate(20);
    createCanvas(matrix[0].length * side, matrix.length * side);
    background('#acacac');




    socket.on("data", drawCreatures);
    socket.on("weather", function (data)
    {
        weath = data;
    })
    // for (let y = 0; y < matrix.length; y++) {
    //     for (let x = 0; x < matrix[y].length; x++) {
            
    //         if (matrix[y][x] == 1){
    //             let gr = new Grass(x, y);
    //             grassArr.push(gr);
    //         }
    //         else if (matrix[y][x] == 2){
    //             let eater = new GrassEater(x, y);
    //             grassEaterArr.push(eater);
    //         }
    //         // else if (matrix[y][x] == 3){
    //         //     let eater = new poisonGrass(x, y);
    //         //     poisonGrassArr.push(eater);
    //         // }
    //         else if (matrix[y][x] == 4){
    //             let eater = new Eater(x, y);
    //             EaterArr.push(eater);}
    //         else if (matrix[y][x] == 6){
    //             let eater = new Water(x, y);
    //             waterArr.push(eater);}
               
    //     }
        
    // }
}
// function mouseDragged() {
//     let wallX = Math.floor(mouseX / side)
//     let wallY = Math.floor(mouseY / side)
//     if (wallY<0 || wallY>=80 || wallX <0 || wallX>=80){
//         return;
//     }

//     isWall = false
//     for (let i in wallArr) {
//         if (wallX == wallArr[i].x && wallY == wallArr[i].y && matrix[wallY][wallX]==4) {
//             isWall = true
//             break
//         }
//     }
//     if (isWall == false) {
//         if (matrix[wallY][wallX]==1){
//             for (let i in grassArr){
//                 if (grassArr[i].x==wallX && grassArr[i].y==wallY) {
//                     for (let i in grassArr){
//                         if (grassArr[i].x==wallX && grassArr[i].y==wallY) {
//                             grassArr.splice(i,1)
//                         }
//                     }
//                 }
//             }
//         }
//         if (matrix[wallY][wallX]==2){
//             for (let i in grassEaterArr){
//                 if (grassEaterArr[i].x==wallX && grassEaterArr[i].y==wallY) {
//                     for (let i in grassEaterArr){
//                         if (grassEaterArr[i].x==wallX && grassEaterArr[i].y==wallY) {
//                             grassEaterArr.splice(i,1)
//                         }
//                     }
//                 }
//             }
//         }
//         if (matrix[wallY][wallX]==3){
//             for (let i in EaterArr){
//                 if (EaterArr[i].x==wallX && EaterArr[i].y==wallY) {
//                     for (let i in EaterArr){
//                         if (EaterArr[i].x==wallX && EaterArr[i].y==wallY) {
//                             EaterArr.splice(i,1)
//                         }
//                     }
//                 }
//             }
//         }
//         // if (matrix[wallY][wallX]==4){
//         //     for (let i in poisonGrassArr){
//         //         if (poisonGrassArr[i].x==wallX && poisonGrassArr[i].y==wallY) {
//         //             for (let i in poisonGrassArr){
//         //                 if (poisonGrassArr[i].x==wallX && poisonGrassArr[i].y==wallY) {
//         //                     poisonGrassArr.splice(i,1)
//         //                 }
//         //             }
//         //         }
//         //     }
//         // }
//         if (matrix[wallY][wallX]==6){
//             for (let i in waterArr){
//                 if (waterArr[i].x==wallX && waterArr[i].y==wallY) {
//                     for (let i in waterArr){
//                         if (waterArr[i].x==wallX && waterArr[i].y==wallY) {
//                             waterArr.splice(i,1)
//                         }
//                     }
//                 }
//             }
//         }
        
//         wallArr.push(new Wall(wallX, wallY))
//     }
//     return false;
// }

function draw() {

    


    matrix = data.matrix;
    grassCountElement.innerText = data.grassCounter;
    grassEaterCountElement.innerText = data.grassEaterCounter;
    eaterElement.innerText = data.eaterCounter;
    waterCountElement.innerText = data.waterCounter;
    wallCountElement.innerText = data.wallCounter;



    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {

            if (matrix[y][x] == 1) {
                if(weath == "spring")
                        {
                            fill("green")
                        }
                        else if(weath == "summer")
                        {
                            fill("#007800");
                        }
                        else if(weath == "winter")
                        {
                            fill("#f8f7f7")
                        }
                        else if(weath == "autumn")
                        {
                            fill("#cb5400")
                        }
            }
            else if (matrix[y][x] == 0) {
                fill("#gray");
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
                fill("brown");
            }
            else if (matrix[y][x] == 6) {
                fill("blue");
            }
            rect(x * side, y * side, side, side);

        }
    }

    // for (let i = 0; i < grassArr.length; i++) {
    //     const grass = grassArr[i];
    //     grass.mul();
    // }
    // for (let i = 0; i < grassEaterArr.length; i++) {
    //     const grasseater = grassEaterArr[i];
    //     grasseater.eat();
    // }


    // // for (let i = 0; i < poisonGrassArr.length; i++) {

    // //     const poison =poisonGrassArr[i];
    // //     poison.mul();

    // // }
    // for (let i = 0; i <EaterArr.length; i++) {
    //     const Eater = EaterArr[i];
    //     Eater.eat();
    // }
    // for (let i = 0; i <waterArr.length; i++) {
    //     const water = waterArr[i];
    //     water.create();
    // }
    
}    


function kill() {
    socket.emit("kill")
}