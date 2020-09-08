import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Location } from '@angular/common';
import { Subject, interval, fromEvent, Subscription } from 'rxjs';
import { buffer, switchMap, takeUntil } from 'rxjs/operators';
import { SharedDataService } from 'src/app/Services/shared-data.service';
import { Document } from 'src/app/DTO/Documents/document';
import { Marker } from 'src/app/DTO/Markers/marker';
import { CreateMarkerService} from 'src/app/Services/Marker/create-marker.service'
import { CreateMarkerRequest } from 'src/app/DTO/Markers/create-marker-request';
import { MarkerLocation } from 'src/app/DTO/Markers/marker-location';
import {point} from 'src/app/DTO/Markers/Shapes/point'
import {MarkerShape} from 'src/app/DTO/Markers/Shapes/marker-shape'
import {Rectangle} from 'src/app/DTO/Markers/Shapes/rectangle'
import {Ellipse} from 'src/app/DTO/Markers/Shapes/ellipse'
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-drawing-markers',
  templateUrl: './drawing-markers.component.html',
  styleUrls: ['./drawing-markers.component.css']
})
export class DrawingMarkersComponent implements OnInit {
  @ViewChild('shapeCanvas',{static:false}) shapeCanvas:ElementRef;
  @ViewChild('drawingCanvas',{static:false}) drawingCanvas:ElementRef;
  @ViewChild('btn',{static:false}) btn:ElementRef
  @ViewChild('btnCancel',{static:false}) btnCancel:ElementRef
  title = 'DrawingApp';
  mDown:Boolean
  mouseDown$:any
  poly:Subject<point>
  switchSubject:Subject<point>
  ping$:any = interval(20000);
  doc:Document
  userID:string
  markers:Array<Marker>
  markerShape:MarkerShape
  shape:string = "Ellipse"
  subscriptions:Array<Subscription> = new Array<Subscription>()
  selectedMarker:Marker

  
  constructor(private location:Location,private sharedDataService:SharedDataService,
    private createMarkerService:CreateMarkerService) { 
    this.poly = new Subject<point>() 
    this.switchSubject = new Subject<point>() 
    this.mDown = false
  }

  ngOnInit(): void {
    this.subscriptions.push(this.sharedDataService.currentDoc.subscribe(
      doc => this.doc = doc
    ))
    this.subscriptions.push(this.sharedDataService.currentUserID.subscribe(
      userID => this.userID = userID
    ))
    this.subscriptions.push(this.createMarkerService.onCreateMarkerOK.subscribe(
      response => console.log(response.request.markerID + " has created")
    ))
    this.subscriptions.push(this.createMarkerService.onCreateMarkerInvalidDocID.subscribe(
      response => console.log(response.request.docID + " invalid doc")
    ))
    this.subscriptions.push(this.createMarkerService.onCreateMarkerInvalidMarkerType.subscribe(
      response => console.log(response.request.markerType + " invalid markerType")
    ))
    this.subscriptions.push(this.createMarkerService.onCreateMarkerInvalidUserID.subscribe(
      response => console.log(response.request.userID + " invalid userID")
    ))
    this.subscriptions.push(this.createMarkerService.onResponseError.subscribe(
      response => console.log("error in createMarker, " + response.message)
    ))
  }
  ngOnDestroy(): void{
    this.subscriptions.forEach( subscription => subscription.unsubscribe())
  }
  updateMarkers(event){

    this.clearShapeCanvas()
    this.markers = event
    this.markers.forEach(marker => {
      var center:point = new point(marker.markerLocation.pointX,marker.markerLocation.pointY)
      var radius:point = new point(marker.markerLocation.radiusX,marker.markerLocation.radiusY)
      this.drawShape(this.getNewMarkerShape(marker.markerType,center,radius))
    });
    if(this.selectedMarker != null){
      var marker = this.selectedMarker
      var center:point = new point(marker.markerLocation.pointX,marker.markerLocation.pointY)
      var radius:point = new point(marker.markerLocation.radiusX,marker.markerLocation.radiusY)
      var markerShape = this.getNewMarkerShape(marker.markerType,center,radius)
      markerShape.bold()
    
      this.drawShape(markerShape)
    }
  }
  selectMarker(event){
    if(this.selectedMarker === event){
      this.selectedMarker = null
    }else{
      this.selectedMarker = event
    }
    console.log("select: " + event)
    this.updateMarkers(this.markers)
  
  }
  getNewMarkerShape(shape:String,center:point,radius:point):MarkerShape{
    if(shape == "Rectangle"){
      return new Rectangle(center,radius)
    }else if(shape == "Ellipse"){
      return new Ellipse(center,radius)
    }
  }
  public createImgPath = () => {
    var image = environment.documentApi+'/'+this.doc.imageURL;
    return image
  }


  //drawing
  clearCanvas(){
    var canvas = this.drawingCanvas.nativeElement 
    var ctx2 = canvas.getContext('2d')
    ctx2.clearRect(0, 0, this.drawingCanvas.nativeElement.width, this.drawingCanvas.nativeElement.height);
  }
  clearShapeCanvas(){
    var ctx1 = this.shapeCanvas.nativeElement.getContext('2d')
    ctx1.clearRect(0, 0, this.shapeCanvas.nativeElement.width, this.shapeCanvas.nativeElement.height);
  }
  selectShape(shape:string){
    this.shape = shape
  }
  freeDraw(evt){
    console.log(evt.movementX+":"+evt.movementY)
    var canvas = this.drawingCanvas.nativeElement 
    var ctx2 = canvas.getContext('2d')
     var rect = canvas.getBoundingClientRect();
     //the place on the canvas
    var xcanvas = evt.clientX - rect.left
    var ycanvas = evt.clientY - rect.top
  
    // draw the lines on the canvas
    ctx2.beginPath() 
    ctx2.moveTo(xcanvas-evt.movementX,ycanvas-evt.movementY)
    ctx2.lineTo(xcanvas,ycanvas)
    ctx2.stroke()
    this.poly.next(new point(xcanvas-evt.movementX,ycanvas-evt.movementY))
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
    this.markerShape = this.getNewMarkerShape(this.shape,center,radius)
    var request:CreateMarkerRequest = new CreateMarkerRequest()
    request.BackColor = "black"
    request.ForeColor = "red"
    request.DocID = this.doc.docID
    request.UserID = this.userID
    request.MarkerLocation = this.markerShape.toLocation()
    request.MarkerType = this.markerShape.toString()

    this.createMarkerService.CreateMarker(request)
    //this.drawShape(center,radius,this.shape)
  }
  drawShape(markerShape:MarkerShape){
      //get the canvas
      var ctx1 = this.shapeCanvas.nativeElement.getContext('2d')
      //draw the marker
      markerShape.draw(ctx1)


      
  }
  
  ngAfterViewInit() {
    console.log("Finish initialize view in edit document")
    //var elem = document.querySelector("#mydiv")

    // init the canvas to draw on
    var ctx1 = this.shapeCanvas.nativeElement.getContext('2d')
    this.shapeCanvas.nativeElement.width = 800
    this.shapeCanvas.nativeElement.height = 1200

    this.drawingCanvas.nativeElement.width = 800
    this.drawingCanvas.nativeElement.height = 1200
    // init the canvas of shapes
    var ctx2 = this.drawingCanvas.nativeElement.getContext('2d')
    //bottun events
    var drawBtn$ = fromEvent(this.btn.nativeElement,'click')
    var drawMode = false
    //when draw btn start draw
    drawBtn$.subscribe(evt=>drawMode = true)
    
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
  
      //draw each line on canvas (need to websoxket to server)
      draw$.subscribe(evt=>this.freeDraw(evt))
      function getDrawMode(value):boolean{
        return drawMode
      }
      
      this.poly.pipe(
        //wait until mouse up
        buffer(mouseUp$),
         
      ).subscribe(shapePoly=>{this.clearCanvas();this.createShape(shapePoly);})//this.clearCanvas();this.drawShape(shapePoly)})
  

    /*ctx1.beginPath();
    ctx1.arc(100, 75, 50, 0, 2 * Math.PI);
    ctx1.stroke();*/
/*
    ctx2.beginPath();
    ctx2.rect(20, 20, 150, 100);
    ctx2.stroke();
    
    ctx2.clearRect(0, 0, this.drawingCanvas.nativeElement.width, this.drawingCanvas.nativeElement.height);*/
    
  }

}