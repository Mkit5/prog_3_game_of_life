module.exports =  class Wall{
    constructor (x,y){
        this.x = x
        this.y = y


        try {
            if (matrix[y][x] == 1){
                for (let i in grassArr){
                    if (grassArr[i].x==this.x && grassArr[i].y==this.y){
                        grassArr[i].die()
                    }
                }
            }
                if (matrix[y][x] == 3){
                for (let i in EaterArr){
                    if (EaterArr[i].x==this.x && EaterArr[i].y==this.y){
                        EaterArr[i].die()
                    }
                }
            }
            if (matrix[y][x] == 4){
                for (let i in poisonGrassArr){
                    if (poisonGrassArr[i].x==this.x && poisonGrassArr[i].y==this.y){
                        poisonGrassArr[i].die()
                    }
                }
            }
            if (matrix[y][x] == 2){
                for (let i in grassEaterArr){
                    if (grassEaterArr[i].x==this.x && grassEaterArr[i].y==this.y){
                        grassEaterArr[i].die()
                    }
                }
            }
            matrix[y][x] = 5;







    }catch (error) {}
        }}
