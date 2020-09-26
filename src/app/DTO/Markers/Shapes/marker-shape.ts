import { MarkerLocation } from '../marker-location';
import { point } from './point';

enum shapeType {rectangle, ellipse}
export abstract class MarkerShape {
    protected center:point
    protected radius:point
    protected stroke = 2
    protected bgColor:string
    protected fgColor:string
    setCenter(center:point){
        this.center = center
    }
    setRadius(radius:point){
        this.radius = radius
    }
    setBgColor(color:string){
        this.bgColor = color
    }
    setFgColor(color:string){
        this.fgColor = color
    }
    draw(ctx:any){
        var stroke = "rgba(" + this.hexToNumber(this.fgColor.substr(1,2))+","+
                this.hexToNumber(this.fgColor.substr(3,2))+","+this.hexToNumber(this.fgColor.substr(5,2)) 
                +","+this.hexToNumber(this.fgColor.substr(7,2))/255+")"
        var fill = "rgba(" + this.hexToNumber(this.bgColor.substr(1,2))+","+
                    this.hexToNumber(this.bgColor.substr(3,2))+","+this.hexToNumber(this.bgColor.substr(5,2)) 
                    +","+this.hexToNumber(this.bgColor.substr(7,2))/255+")"
        ctx.fillStyle = fill
        ctx.strokeStyle = stroke
        ctx.lineWidth = this.stroke
    }
    toLocation():MarkerLocation {
        var location = new MarkerLocation()
        location.pointX = this.center.X
        location.pointY = this.center.Y
        location.radiusX = this.radius.X
        location.radiusY = this.radius.Y
        return location
    }
    abstract toString()
    bold(){
        this.stroke = 10
    }
    normal(){
        this.stroke = 2
    }
    private hexToNumber(hex:string):number{
        var number =  Number("0x"+hex)
        return number
    }
}
