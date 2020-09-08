import { Injectable } from '@angular/core';
import { MarkerCommService } from './marker-comm.service';
import { HttpClient } from '@angular/common/http';
import { CreateMarkerRequest } from 'src/app/DTO/Markers/create-marker-request';
import { Observable } from 'rxjs';
import { GetMarkersRequest } from 'src/app/DTO/Markers/get-markers-request';
import { RemoveMarkerRequest } from 'src/app/DTO/Markers/remove-marker-request';

@Injectable({
  providedIn: 'root'
})
export class ApiMarkerCommService extends MarkerCommService {
  

  constructor(private httpClient:HttpClient) {
    super()
   }
   CreateMarker(request: CreateMarkerRequest): Observable<any> {
    return this.httpClient.post('api/Marker/CreateMarker',request)
  }
  GetMarkers(request: GetMarkersRequest): Observable<any> {
    return this.httpClient.post('api/Marker/GetMarkers',request)
  }
  RemoveMarker(request: RemoveMarkerRequest): Observable<any> {
    return this.httpClient.post('api/Marker/RemoveMarker',request)
  }
}
