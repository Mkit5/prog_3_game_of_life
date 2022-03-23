var LivingCreature = require("./LiveForm");
var random = require("./random");


module.exports =class Water extends LivingCreature{


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