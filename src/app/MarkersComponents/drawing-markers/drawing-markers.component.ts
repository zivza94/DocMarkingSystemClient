import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
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
import { AlertService } from 'src/app/Services/alert.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';
import {DrawingService} from 'src/app/Services/Marker/drawing.service'
import { ColorPickerComponent } from 'src/app/Color/color-picker/color-picker.component';
import { Line } from 'src/app/DTO/Markers/Shapes/line';


@Component({
  selector: 'app-drawing-markers',
  templateUrl: './drawing-markers.component.html',
  styleUrls: ['./drawing-markers.component.css'],
  providers:[DrawingService]
})
export class DrawingMarkersComponent implements OnInit {
  @ViewChild('shapeCanvas',{static:false}) shapeCanvas:ElementRef;
  @ViewChild('drawingCanvas',{static:false}) drawingCanvas:ElementRef;
  @ViewChild('btn',{static:false}) btn:ElementRef
  @ViewChild('btnCancel',{static:false}) btnCancel:ElementRef
  @ViewChild('fgColor') fgColorElem:ElementRef
  @ViewChild('bgColor') bgColorElem:ElementRef
  @ViewChild('fgTrans') fgTrans:ElementRef
  @ViewChild('bgTrans') bgTrans:ElementRef

  title = 'DrawingApp';
  mDown:Boolean
  mouseDown$:any
  poly:Subject<point>
  switchSubject:Subject<point>
  ping$:any = interval(20000);
  @Input() doc:Document
  @Input() userID:string
  markers:Array<Marker>
  markerShape:MarkerShape
  shape:string = "Ellipse"
  subscriptions:Array<Subscription> = new Array<Subscription>()
  selectedMarker:Marker
  fgColor:string
  bgColor:string
  //fgTrans:string

  
  constructor(private drawingService:DrawingService) { 
    this.poly = new Subject<point>() 
    this.switchSubject = new Subject<point>() 
    this.mDown = false
  }

  ngOnInit(): void {
    //drawing service 
    this.subscriptions.push(this.drawingService.onFreeDraw.subscribe(
      evt => this.freeDraw(evt)
    ))
    this.subscriptions.push(this.drawingService.onPolyDraw.subscribe(
      markerShape => this.drawShape(markerShape)
    ))
    this.subscriptions.push(this.drawingService.onUpdateShapes.subscribe(
      markerShapes => this.updateMarkers(markerShapes)
    ))
    this.subscriptions.push(this.drawingService.onFinishDraw.subscribe(
      response => this.clearCanvas()
    ))
  }
  ngOnDestroy(): void{
    this.subscriptions.forEach( subscription => subscription.unsubscribe())
    this.drawingService.destroy()
  }
  selectShape(shape:string){
    this.drawingService.selectShape(shape)
  }
  getMarkers(event){
    this.drawingService.updateMarkers(event)
  }
  updateMarkers(markerShapes:Array<MarkerShape>){
    this.clearShapeCanvas()
    markerShapes.forEach(markerShape =>{
      this.drawShape(markerShape)
    })
  }
  selectMarker(event){
    this.drawingService.selectMarker(event)
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
  freeDraw(line:Line){
    var ctx2 = this.drawingCanvas.nativeElement.getContext('2d')
    line.draw(ctx2)
  }
  
  drawShape(markerShape:MarkerShape){
      var ctx1 = this.shapeCanvas.nativeElement.getContext('2d')
      markerShape.draw(ctx1)  
  }
  ngAfterViewInit() {
    // init the canvas to draw on
    this.shapeCanvas.nativeElement.width = 800
    this.shapeCanvas.nativeElement.height = 700
    this.drawingCanvas.nativeElement.width = 800
    this.drawingCanvas.nativeElement.height = 700
    //
    this.drawingService.setData(this.doc.docID,this.userID)
    this.drawingService.ngAfterViewInit(this.drawingCanvas,this.fgColorElem,this.bgColorElem,this.fgTrans,this.bgTrans)   
  }

}