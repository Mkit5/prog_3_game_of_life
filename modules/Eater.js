var LivingCreature = require("./LiveForm");
var random = require("./random");


module.exports =class Eater extends LivingCreature{
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