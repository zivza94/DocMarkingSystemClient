import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Marker } from 'src/app/DTO/Markers/marker';
import { Subscription } from 'rxjs';
import {RemoveMarkerService} from 'src/app/Services/Marker/remove-marker.service'
import { RemoveMarkerRequest } from 'src/app/DTO/Markers/remove-marker-request';

@Component({
  selector: 'app-remove-marker',
  templateUrl: './remove-marker.component.html',
  styleUrls: ['./remove-marker.component.css']
})
export class RemoveMarkerComponent implements OnInit {
  @Input() marker:Marker
  @Input() userID:string
  @Output() public onRemoved = new EventEmitter();
  subscriptions:Array<Subscription> = new Array<Subscription>()

  constructor(private removeMarkerService:RemoveMarkerService) { }

  ngOnDestroy(): void{
    this.subscriptions.forEach( subscription => subscription.unsubscribe())
    console.log("destroy remove doc: " + this.marker.markerID)
  }
  ngOnInit(): void {
    this.subscriptions.push(this.removeMarkerService.onRemoveMarkerOK.subscribe(
      response => {
        console.log("doc: " + this.marker.markerID + " removed ")
        this.onRemoved.emit(this.marker)
      }
    ))
    this.subscriptions.push(this.removeMarkerService.onRemoveMarkerInvalidID.subscribe(
      response =>console.log("invalid marker id")
    ))
    this.subscriptions.push(this.removeMarkerService.onResponseError.subscribe(
      response => console.log(response.message)
    ))
  }
  removeMarker(){
    var request:RemoveMarkerRequest = new RemoveMarkerRequest();
    request.markerID = this.marker.markerID
    this.removeMarkerService.RemoveMarker(request)
    
  }

}
