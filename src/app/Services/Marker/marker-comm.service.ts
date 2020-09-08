import { Injectable } from '@angular/core';
import { CreateMarkerRequest } from 'src/app/DTO/Markers/create-marker-request';
import { Observable } from 'rxjs';
import { GetMarkersRequest } from 'src/app/DTO/Markers/get-markers-request';
import { RemoveMarkerRequest } from 'src/app/DTO/Markers/remove-marker-request';

@Injectable({
  providedIn: 'root'
})
export abstract class MarkerCommService {

  constructor() { }

  abstract CreateMarker(request:CreateMarkerRequest):Observable<any>

  abstract GetMarkers(request :GetMarkersRequest):Observable<any>
  abstract RemoveMarker(request:RemoveMarkerRequest):Observable<any>
}
