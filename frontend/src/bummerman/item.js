export default class Bomb {

    static renderI1(ctx, position) {
        ctx.fillStyle = "#FF69B4";
        ctx.fillRect(position[0], position[1], 48, 48);
    }
    static renderI2(ctx, position) {
        ctx.fillStyle = "#ec170c";
        ctx.fillRect(position[0], position[1], 48, 48);
    }
    static renderI3(ctx, position) {
        ctx.fillStyle = "#81F353";
        ctx.fillRect(position[0], position[1], 48, 48);
    }

    static itemSelector(){
        //legend
        //I1 = bomb+ //pink
        //I2 = speed+ //red
        //I3 = fire+
        //I4 = invisibility
        let options = ["I1", "I2", "I3", "X", "X", "X", "X", "X"];
        let item = options[Math.floor(Math.random() * options.length)];
        return item;
    }

}