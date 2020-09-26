import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import {Marker} from 'src/app/DTO/Markers/marker'
import { Subscription } from 'rxjs';
import {GetMarkersService} from 'src/app/Services/Marker/get-markers.service'
import { GetMarkersRequest } from 'src/app/DTO/Markers/get-markers-request';
import { Document } from 'src/app/DTO/Documents/document';
import { SharedDataService } from 'src/app/Services/shared-data.service';
import { environment} from 'src/environments/environment'
import { AlertService } from 'src/app/Services/alert.service';
import { MarkerWSService } from 'src/app/Services/Marker/marker-ws.service';
@Component({
  selector: 'app-markers-list',
  templateUrl: './markers-list.component.html',
  styleUrls: ['./markers-list.component.css'],
  providers:[MarkerWSService]
})
export class MarkersListComponent implements OnInit {
  @Input() doc:Document
  selectedMarker:Marker
  @Input() userID:string
  markers:Array<Marker>
  subscriptions:Array<Subscription> = new Array<Subscription>()
  //subject = new WebSocket(environment.markerWs)
  @Output() onUpdateMarkers = new EventEmitter();
  @Output() onSelectMarker = new EventEmitter();

  constructor(private getMarkersService:GetMarkersService,private sharedDataService:SharedDataService,
              private alertService:AlertService,private markerWSService:MarkerWSService) { 
                this.markerWSService.connect()
              }
  ngOnDestroy(): void{
    this.subscriptions.forEach( subscription => subscription.unsubscribe())
    this.markerWSService.disconnect()
  }
  ngOnInit(): void {
    this.getMarkers()
    this.subscriptions.push(
      this.getMarkersService.onGetMarkersOK.subscribe(
      response => {
        console.log("Get Markers ok")
        this.markers = response.markers
        this.onUpdateMarkers.emit(this.markers)
      }
    ))
    this.subscriptions.push(
      this.getMarkersService.onGetMarkersInvalidDocID.subscribe(
      response => {
        this.alertService.openModal("Get markers" , "Invalid document id")
      }
    ))
    this.subscriptions.push(
      this.getMarkersService.onResponseError.subscribe(
      response => this.alertService.openModal("Get markers" , response.message)
    ))
    this.subscriptions.push(
      this.markerWSService.onNewMarker.subscribe(
        response => {
          if(this.doc.docID != response.marker.docID){
            return 
          }
          this.markers.push(response.marker as Marker)
        }
      )
    )
    this.subscriptions.push(
      this.markerWSService.onRemoveMarker.subscribe(
        response => this.markers = this.markers.filter(marker => marker.markerID != response.markerID)
      )
    )
  }

  getMarkers(){
    var request:GetMarkersRequest = new GetMarkersRequest()
    request.docID = this.doc.docID
    this.getMarkersService.GetMarkers(request)
  }
  onSelect(marker:Marker){
    this.selectedMarker = marker
    this.onSelectMarker.emit(marker)
  }
  removed(event){
    console.log(event.markerID +" has been removed")
    //this.onSelectMarker.emit(this.selectedMarker)
  }

}
