class LivingCreature {
    constructor(x, y){
        this.x = x;
        this.y = y;
        this.energy = 8;
        this.directions = [
           [this.x - 1, this.y - 1],
           [this.x, this.y - 1],
           [this.x + 1, this.y - 1],
           [this.x - 1, this.y],
           [this.x + 1, this.y],
           [this.x - 1, this.y + 1],
           [this.x, this.y + 1],
           [this.x + 1, this.y + 1]
       ];
 
    }
    chooseCell(char) {
        let result = [];

        for (let i = 0; i < this.directions.length; i++) {
            let x = this.directions[i][0];
            let y = this.directions[i][1];

            if ( y < matrix.length && y >= 0 && x < matrix[0].length && x >= 0 ){
                if (matrix[y][x] == char) {
                    result.push(this.directions[i]);
                }
            }

        }

        return result;
    }
}

    class Grass extends LivingCreature{
    // constructor(x, y) {
    //     this.x = x;
    //     this.y = y;
    //     this.energy = 8;
    //     this.directions = [
    //         [this.x - 1, this.y - 1],
    //         [this.x, this.y - 1],
    //         [this.x + 1, this.y - 1],
    //         [this.x - 1, this.y],
    //         [this.x + 1, this.y],
    //         [this.x - 1, this.y + 1],
    //         [this.x, this.y + 1],
    //         [this.x + 1, this.y + 1]
    //     ];
    // }
    // chooseCell(char) {
    //     let result = [];

    //     for (let i = 0; i < this.directions.length; i++) {
    //         let x = this.directions[i][0];
    //         let y = this.directions[i][1];

    //         if ( y < matrix.length && y >= 0 && x < matrix[0].length && x >= 0 ){
    //             if (matrix[y][x] == char) {
    //                 result.push(this.directions[i]);
    //             }
    //         }

    //     }

    //     return result;
    //}
    mul() {
        this.energy++;
        let found = this.chooseCell(0);
        let exact = random(found)

        if (exact && this.energy >9) {
            let x = exact[0];
            let y = exact[1];

            let grass = new Grass(x, y);
            matrix[y][x] = 1;
            grassArr.push(grass);

            this.energy = 0;
        } 
        }
    }

class GrassEater extends LivingCreature{
    constructor(x, y) {
        super(x,y)
        this.energy = 20;
        
    }
    getNewCordinates(){
              this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }
    chooseCell(char) {
      this.getNewCordinates();
      return super.chooseCell(char);
        // let result = [];

        // for (let i = 0; i < this.directions.length; i++) {
        //     let x = this.directions[i][0];
        //     let y = this.directions[i][1];

        //     if ( y < matrix.length && y >= 0 && x < matrix[0].length && x >= 0 ){
        //         if (matrix[y][x] == char) {
        //             result.push(this.directions[i]);
        //         }
        //     }

        // }

        // return result;
    }
    mul() {
        let found = this.chooseCell(0);
        let exact = random(found)

        if (exact && this.energy > 8) {
            let x = exact[0];
            let y = exact[1];

            let eater = new GrassEater(x, y);
            matrix[y][x] = 2;
            grassEaterArr.push(eater);

            this.energy = 20;
        } 
    }
    eat(){
        // let found1 = this.chooseCell(3);
        // let exact1 = random(found1);
        // if(exact1){
        //     this.energy ==0;
        //     let x = exact1[0];
        //     let y = exact1[1];

        //     for (let i = 0; i < poisonGrassArr.length; i++) {
        //         if( poisonGrassArr[i].x == x && poisonGrassArr[i].y == y ){
        //             poisonGrassArr.splice(i, 1)
        //         }
        //     }

        //     matrix[y][x] = 0
        //     matrix[this.y][this.x] = 0
            
        //     this.x = x;
        //     this.y = y
        // }
        // else {
        let found = this.chooseCell(1);
        let exact = random(found)
    
    
         if (exact){
            this.energy +=5;
            let x = exact[0];
            let y = exact[1];

            for (let i = 0; i < grassArr.length; i++) {
                if( grassArr[i].x == x && grassArr[i].y == y ){
                    grassArr.splice(i, 1)
                }
            }

            matrix[y][x] = 2
            matrix[this.y][this.x] = 0
            
            this.x = x;
            this.y = y

            if(this.energy > 30){
                this.mul()
            }
        }else {
            this.move()
        }
        }
    // }
    move(){
        let found = this.chooseCell(0);
        let exact = random(found)

        if (exact){
            let x = exact[0];
            let y = exact[1];

            matrix[y][x] = 2
            matrix[this.y][this.x] = 0

            this.x = x;
            this.y = y;

            this.energy-=2

            if(this.energy < 0){
                this.die()
            }
        }else {
            this.energy-=1
            if(this.energy < 0){
                this.die()
            }
        }
    }
    die(){
        for (let i = 0; i < grassEaterArr.length; i++) {
            if( grassEaterArr[i].x == this.x && grassEaterArr[i].y == this.y ){
                grassEaterArr.splice(i, 1)
            }
        }
        matrix[this.y][this.x] = 0
    }
}

// class poisonGrass {


	
//         constructor(x, y) {
//             this.x = x;
//             this.y = y;
//             this.energy = 8;
//             this.directions = [
//                 [this.x - 1, this.y - 1],
//                 [this.x, this.y - 1],
//                 [this.x + 1, this.y - 1],
//                 [this.x - 1, this.y],
//                 [this.x + 1, this.y],
//                 [this.x - 1, this.y + 1],
//                 [this.x, this.y + 1],
//                 [this.x + 1, this.y + 1]
//             ];
//         }
//         chooseCell(char) {
//             let result = [];
    
//             for (let i = 0; i < this.directions.length; i++) {
//                 let x = this.directions[i][0];
//                 let y = this.directions[i][1];
    
//                 if ( y < matrix.length && y >= 0 && x < matrix[0].length && x >= 0 ){
//                     if (matrix[y][x] == char) {
//                         result.push(this.directions[i]);
//                     }
//                 }
    
//             }
    
//             return result;
//         }
//         mul() {
//             this.energy++;
//             let found = this.chooseCell(0);
//             let exact = random(found)
    
//             if (exact && this.energy > 20) {
//                 let x = exact[0];
//                 let y = exact[1];
    
//                 let grass = new poisonGrass(x, y);
//                 matrix[y][x] = 3;
//                 poisonGrassArr.push(grass);
    
//                 this.energy = 0;
//             } 
            

            
//             }
        


// }
class Eater extends LivingCreature{
    constructor(x, y) {
        super(x,y);
        this.energy = 45;
    }
    getNewCordinates(){
              this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }
    chooseCell(char) {
      this.getNewCordinates();
      return super.chooseCell(char);
        // let result = [];

        // for (let i = 0; i < this.directions.length; i++) {
        //     let x = this.directions[i][0];
        //     let y = this.directions[i][1];

        //     if ( y < matrix.length && y >= 0 && x < matrix[0].length && x >= 0 ){
        //         if (matrix[y][x] == char) {
        //             result.push(this.directions[i]);
        //         }
        //     }

        // }

        // return result;
    }
    mul() {
        let found = this.chooseCell(0);
        let exact = random(found)

        if (exact && this.energy > 8) {
            let x = exact[0];
            let y = exact[1];

            let eater = new Eater(x, y);
            matrix[y][x] = 2;
            EaterArr.push(eater);

            this.energy = 20;
        } 
    }
    eat(){
        let found = this.chooseCell(1);
        let exact = random(found)
        let found1 = this.chooseCell(2);
        let exact1 = random(found1)
        // let found2 = this.chooseCell(3);
        // let exact2 = random(found2)
         if (exact){
            this.energy +=5;
            let x = exact[0];
            let y = exact[1];

            for (let i = 0; i < grassArr.length; i++) {
                if( grassArr[i].x == x && grassArr[i].y == y ){
                    grassArr.splice(i, 1)
                }
            }

            matrix[y][x] = 4
            matrix[this.y][this.x] = 0
            
            this.x = x;
            this.y = y

            if(this.energy >= 60){
                this.mul()
            }
        }else {
            this.move()
        }
        if (exact1){
            this.energy +=5;
            let x = exact1[0];
            let y = exact1[1];

            for (let i = 0; i < grassEaterArr.length; i++) {
                if( grassEaterArr[i].x == x && grassEaterArr[i].y == y ){
                    grassEaterArr.splice(i, 1)
                }
            }

            matrix[y][x] = 4
            matrix[this.y][this.x] = 0
            
            this.x = x;
            this.y = y

            if(this.energy >= 60){
                this.mul()
            }
        }else {
            this.move()
        }
        // if (exact2){
        //     this.energy +=5;
        //     let x = exact2[0];
        //     let y = exact2[1];

        //     for (let i = 0; i < poisonGrassArr.length; i++) {
        //         if( poisonGrassArr[i].x == x && poisonGrassArr[i].y == y ){
        //             poisonGrassArr.splice(i, 1)
        //         }
        //     }

        //     matrix[y][x] = 4
        //     matrix[this.y][this.x] = 0
            
        //     this.x = x;
        //     this.y = y

        //     if(this.energy >= 60){
        //         this.mul()
        //     }
        // }else {
        //     this.move()
        // }
    }
    move(){
        let found = this.chooseCell(0);
        let exact = random(found)

        if (exact){
            let x = exact[0];
            let y = exact[1];

            matrix[y][x] = 4
            matrix[this.y][this.x] = 0

            this.x = x;
            this.y = y;

            this.energy-=1

            if(this.energy < 0){
                this.die()
            }
        }else {
            this.energy-=1
            if(this.energy < 0){
                this.die()
            }
            else{
                this.eat()
            }
        }
    }
    die(){
        for (let i = 0; i < EaterArr.length; i++) {
            if( EaterArr[i].x == this.x && EaterArr[i].y == this.y ){
                EaterArr.splice(i, 1)
            }
        }
        matrix[this.y][this.x] = 0
    }
}   




class Wall{
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
        class Water extends LivingCreature{

            // constructor(x, y) {
            //     this.x = x;
            //     this.y = y;
            //     this.directions = [
            //         [this.x - 1, this.y - 1],
            //         [this.x, this.y - 1],
            //         [this.x + 1, this.y - 1],
            //         [this.x - 1, this.y],
            //         [this.x + 1, this.y],
            //         [this.x - 1, this.y + 1],
            //         [this.x, this.y + 1],
            //         [this.x + 1, this.y + 1]
            //     ];
            // }
            // chooseCell(char) {
            //     let result = [];
        
            //     for (let i = 0; i < this.directions.length; i++) {
            //         let x = this.directions[i][0];
            //         let y = this.directions[i][1];
        
            //         if ( y < matrix.length && y >= 0 && x < matrix[0].length && x >= 0 ){
            //             if (matrix[y][x] == char) {
            //                 result.push(this.directions[i]);
            //             }
            //         }
        
            //     }
        
            //     return result;
            // }


        create(){

            let found = this.chooseCell(0);
            let exact = random(found)
            if(exact){
                let x = exact[0];
                let y = exact[1];
    
                let grass = new Grass(x, y);
                matrix[y][x] = 1;
                grassArr.push(grass);
    



            }

        }
        }