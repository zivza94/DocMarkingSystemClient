import { point } from './point'

export class Line {
    
    stroke = 2
    fgColor:string
    constructor(public start:point, public end:point){}
    draw(ctx:any){
        var stroke = "rgba(" + this.hexToNumber(this.fgColor.substr(1,2))+","+
                this.hexToNumber(this.fgColor.substr(3,2))+","+this.hexToNumber(this.fgColor.substr(5,2)) 
                +","+this.hexToNumber(this.fgColor.substr(7,2))/255+")"
        ctx.strokeStyle = stroke
        ctx.lineWidth = this.stroke
        ctx.beginPath();
        ctx.moveTo(this.start.X,this.start.Y)
        ctx.lineTo(this.end.X,this.end.Y)
        ctx.stroke();

        
    }
    private hexToNumber(hex:string):number{
        var number =  Number("0x"+hex)
        return number
    }
}
