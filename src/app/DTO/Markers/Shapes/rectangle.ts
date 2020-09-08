import { MarkerShape } from './marker-shape';
import { point } from './point';
import { MarkerLocation } from '../marker-location';

export class Rectangle extends MarkerShape{
    private stroke=2
    constructor(public center:point,public radius:point){
        super()
    }
    draw(ctx:any) {
        ctx.lineWidth = this.stroke
        ctx.beginPath();
        ctx.rect(this.center.X - this.radius.X,this.center.Y - this.radius.Y,this.radius.X*2,this.radius.Y*2)
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
        return "Rectangle"
    }
    bold(){
        this.stroke = 10
    }
    normal(){
        this.stroke = 2
    }
}
