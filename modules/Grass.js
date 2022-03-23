var LivingCreature = require("./LiveForm");
var random = require("./random");


module.exports =class Grass extends LivingCreature{
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