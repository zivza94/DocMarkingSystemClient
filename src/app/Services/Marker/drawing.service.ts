import { Injectable, ViewChild, ElementRef } from '@angular/core';
import { fromEvent, Subject, from } from 'rxjs';
import { switchMap, takeUntil, buffer, map } from 'rxjs/operators';
import { point } from 'src/app/DTO/Markers/Shapes/point'
import { CreateMarkerRequest } from 'src/app/DTO/Markers/create-marker-request';
import { MarkerShape } from 'src/app/DTO/Markers/Shapes/marker-shape';
import { Line } from 'src/app/DTO/Markers/Shapes/line'
import { Ellipse } from 'src/app/DTO/Markers/Shapes/ellipse';
import { Rectangle } from 'src/app/DTO/Markers/Shapes/rectangle';
import { CreateMarkerService } from './create-marker.service';
import { Marker } from 'src/app/DTO/Markers/marker';
import { AlertService } from '../alert.service';
import { MarkerWSService } from './marker-ws.service';
import { LiveDrawWSService } from './live-draw-ws.service'

@Injectable({
  providedIn: 'root'
})
export class DrawingService {
  private markerIDToShape = new Map<string,MarkerShape>()
  docID:string
  userID:string
  markerShape:MarkerShape = new Ellipse()
  bgColor:string = "#000000"
  fgColor:string = "#000000"
  fgTrans:string = "ff"
  bgTrans:string = "00"
  poly = new Subject<any>()
  drawingCanvas
  selectedMarker:Marker
  
  EventsSubjects:{[event:string]:Subject<any>} = {
    freeDraw: new Subject<any>(),
    polyDraw:new Subject<any>(),
    updateShapes: new Subject<any>(),
    finishDraw:new Subject<any>()
  }
  /*shapeFactory:{[shape:string]:MarkerShape} = {
    "Ellipse" : return new Ellipse(),
    "Rectangle": new Rectangle()
  }*/
  shapeFactory(shape:string):MarkerShape{
    if(shape == "Ellipse"){
      return new Ellipse()
    }
    else if(shape == "Rectangle"){
      return new Rectangle()
    }
  }
  get onFreeDraw(){
    return this.EventsSubjects.freeDraw
  }
  get onPolyDraw(){
    return this.EventsSubjects.polyDraw
  }
  get onUpdateShapes(){
    return this.EventsSubjects.updateShapes
  }
  get onFinishDraw(){
    return this.EventsSubjects.finishDraw
  }
  destroy(){
    this.markerWSService.disconnect()
  }
  constructor(private createMarkerService:CreateMarkerService,private alertService:AlertService,private markerWSService:MarkerWSService) { 
    //create marker service response
    this.createMarkerService.onCreateMarkerOK.subscribe(
      response => console.log(response.request.markerID + " has created")
    )
    this.createMarkerService.onCreateMarkerInvalidDocID.subscribe(
      response => this.alertService.openModal("Create marker" , "Invalid document id")
    )
    this.createMarkerService.onCreateMarkerInvalidMarkerType.subscribe(
      response => this.alertService.openModal("Create marker" , "Invalid markerType")
    )
    this.createMarkerService.onCreateMarkerInvalidUserID.subscribe(
      response => this.alertService.openModal("Create marker" , "Invalid user id")
    )
    this.createMarkerService.onResponseError.subscribe(
      response => this.alertService.openModal("Create marker" , response.message)
    )
    
    // marker web Socket
    this.markerWSService.connect()
    this.markerWSService.onNewMarker.subscribe(
      response => {
        if(this.docID != (response.marker as Marker).docID){
          return
        }
        this.addMarker(response.marker as Marker)
        this.EventsSubjects["polyDraw"].next(this.markerIDToShape.get(response.marker.markerID))
      }
    )
    this.markerWSService.onRemoveMarker.subscribe(
      response => this.removeMarker(response.markerID as string)
    )    

  }
  setData(docID:string,userID:string){
    this.docID = docID
    this.userID = userID
  }
  
  updateMarkers(event){
    this.markerIDToShape = new Map<string,MarkerShape>()
    event.map(marker => {
      this.addMarker(marker)
    });
    this.EventsSubjects["updateShapes"].next(Array.from(this.markerIDToShape.values()))
  }
  selectShape(shape:string){
    this.markerShape = this.shapeFactory(shape)
  }
  //TODO handel with unselect
  selectMarker(marker:Marker){
    
    if(this.selectedMarker == marker){
      this.selectedMarker = null
      this.markerIDToShape.get(marker.markerID).normal()
      this.EventsSubjects["updateShapes"].next(Array.from(this.markerIDToShape.values()))
      
    }else {
      if(this.selectedMarker != undefined){
        this.markerIDToShape.get(this.selectedMarker.markerID).normal()
      }
      this.selectedMarker = marker
      this.markerIDToShape.get(marker.markerID).bold()
      this.EventsSubjects["updateShapes"].next(Array.from(this.markerIDToShape.values()))
    }
    
  }
  markerToShape(marker:Marker):MarkerShape{
    console.log(marker)
    var center:point = new point(marker.markerLocation.pointX,marker.markerLocation.pointY)
    var radius:point = new point(marker.markerLocation.radiusX,marker.markerLocation.radiusY)
    var markerShape:MarkerShape = this.shapeFactory(marker.markerType)
    markerShape.setCenter(center)
    markerShape.setRadius(radius)
    markerShape.setBgColor(marker.backColor)
    markerShape.setFgColor(marker.foreColor)
    return markerShape
  }
  createShape(shapePoly:Array<point>){
    // calculate the center
    var center = new point(0,0)
    center = shapePoly.reduce((acc,pt)=>acc.add(pt))
    center = center.div(shapePoly.length)
    //calculate the radius
    var radius  = new point(0,0)
    radius = shapePoly.reduce((acc,pt)=>acc.add(new point(Math.abs(pt.X-center.X),Math.abs(pt.Y-center.Y))))
    radius = radius.div(shapePoly.length)
    this.markerShape.setCenter(center)
    this.markerShape.setRadius(radius)
    this.markerShape.setBgColor(this.bgColor + this.bgTrans)
    this.markerShape.setFgColor(this.fgColor + this.fgTrans)
    
    this.sendRequest(this.markerShape)
  }
  sendRequest(markerShape){
    var request:CreateMarkerRequest = new CreateMarkerRequest()
    request.BackColor = markerShape.bgColor
    request.ForeColor = markerShape.fgColor
    request.DocID = this.docID
    request.UserID = this.userID
    request.MarkerLocation = markerShape.toLocation()
    request.MarkerType = markerShape.toString()

    this.createMarkerService.CreateMarker(request)
  }
  //TODO send points to draw
  freeDraw(evt){
    //get the canvas
    var canvas = this.drawingCanvas.nativeElement 
    var rect = canvas.getBoundingClientRect();
     //the place on the canvas
    var xcanvas = evt.clientX - rect.left
    var ycanvas = evt.clientY - rect.top
    //update free draw
    var from:point = new point(xcanvas-evt.movementX,ycanvas-evt.movementY)
    var to:point = new point(xcanvas,ycanvas)
    var line = new Line(from,to)
    line.fgColor = this.fgColor + this.fgTrans
    this.EventsSubjects["freeDraw"].next(line)
    //update poly
    this.poly.next(new point(xcanvas-evt.movementX,ycanvas-evt.movementY))
  }
  
  ngAfterViewInit(drawingCanvas,fgColorElem,bgColorElem,fgTransElem,bgTransElem){
    this.drawingCanvas = drawingCanvas
    // mouse events
    var mouseUp$ = fromEvent(this.drawingCanvas.nativeElement,'mouseup')
    var mousedown$ = fromEvent(this.drawingCanvas.nativeElement, 'mousedown')
    //when click on mouse
    var draw$ = mousedown$.pipe(
    // restart counter on every click
    switchMap(event=>
      fromEvent(this.drawingCanvas.nativeElement,'mousemove').pipe(
        takeUntil(mouseUp$)
      ))
    )
    
    draw$.subscribe(evt=>this.freeDraw(evt))

    this.poly.pipe(
      //wait until mouse up
      buffer(mouseUp$),
       
    ).subscribe(shapePoly=>{
      this.EventsSubjects["finishDraw"].next("done")
      this.createShape(shapePoly)
      
    })

    //colors
    var fgColor$ = fromEvent(fgColorElem.nativeElement,'change')
    var bgColor$ = fromEvent(bgColorElem.nativeElement,'change')
    var fgTrans$ = fromEvent(fgTransElem.nativeElement,'change')
    var bgTrans$ = fromEvent(bgTransElem.nativeElement,'change')
    
    fgColor$.subscribe((evt:any) => {
      this.fgColor = evt.target.value
    })
    bgColor$.subscribe((evt:any) =>{
      this.bgColor = evt.target.value
    })
    bgTrans$.subscribe((evt:any) =>{
      this.bgTrans = this.numberToHex(evt.target.value)
    })
    fgTrans$.subscribe((evt:any) =>{
      this.fgTrans = this.numberToHex(evt.target.value)
    })

  }
  numberToHex(value:number):string{
    var valueStr = (Math.floor(value/100*255)).toString(16)
    if(valueStr.length == 1){
      valueStr = "0"+valueStr
    }
    return valueStr
  }

  removeMarker(markerID:string){
    if(this.selectedMarker!= null && this.selectedMarker.markerID == markerID){
      this.selectedMarker = null
    }
    if(this.markerIDToShape.delete(markerID)){
      this.EventsSubjects["updateShapes"].next(Array.from(this.markerIDToShape.values()))
    }
    
  }
  addMarker(marker:Marker){
    this.markerIDToShape.set(marker.markerID,this.markerToShape(marker))
  }
}
