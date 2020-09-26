import { MarkerShape } from './marker-shape';
import { point } from './point';
import { MarkerLocation } from '../marker-location';

export class Rectangle extends MarkerShape{
    constructor(){
        super()
    }
    draw(ctx:any) {
        super.draw(ctx)        
        ctx.beginPath();
        ctx.rect(this.center.X - this.radius.X,this.center.Y - this.radius.Y,this.radius.X*2,this.radius.Y*2)
        ctx.stroke();

        ctx.beginPath();
        ctx.rect(this.center.X - this.radius.X,this.center.Y - this.radius.Y,this.radius.X*2,this.radius.Y*2)
        ctx.fill();
    }
    toString() {
        return "Rectangle"
    }
}
