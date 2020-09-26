import { MarkerShape } from './marker-shape';
import { point } from './point'; 
import { MarkerLocation } from '../marker-location';
export class Ellipse extends MarkerShape{
    constructor(){
        super()
    }
    draw(ctx:any) {
        super.draw(ctx)
        ctx.beginPath();
        ctx.ellipse(this.center.X, this.center.Y,this.radius.X,this.radius.Y,0, 0, 2 * Math.PI);
        ctx.stroke();

        ctx.beginPath();
        ctx.ellipse(this.center.X, this.center.Y,this.radius.X,this.radius.Y,0, 0, 2 * Math.PI);
        ctx.fill();
    }
    toString() {
        return "Ellipse"
    }
}
