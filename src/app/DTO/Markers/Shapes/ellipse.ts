import { MarkerShape } from './marker-shape';
import { point } from './point'; 
import { MarkerLocation } from '../marker-location';
export class Ellipse extends MarkerShape{
    private stroke = 2;
    constructor(public center:point,public radius:point){
        super()
    }
    draw(ctx:any) {
        ctx.lineWidth = this.stroke
        ctx.beginPath();
        ctx.ellipse(this.center.X, this.center.Y,this.radius.X,this.radius.Y,0, 0, 2 * Math.PI);
        ctx.stroke();
    }
    toLocation():MarkerLocation {
        var location = new MarkerLocation()
        location.pointX = this.center.X
        location.pointY = this.center.Y
        location.radiusX = this.radius.X
        location.radiusY = this.radius.Y
        return location
    }
    toString() {
        return "Ellipse"
    }
    bold(){
        this.stroke = 10
    }
    normal(){
        this.stroke = 2
    }
}
