import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { StartViewRequest } from 'src/app/DTO/Documents/WebSocket/start-view-request';
import { EndViewRequest } from 'src/app/DTO/Documents/WebSocket/end-view-request';

@Injectable({
  providedIn: 'root'
})
export class ViewingService {

  constructor(private httpClient:HttpClient) { }
  startView(request:StartViewRequest){
    this.httpClient.post('api/viewing/startView',request)
  }
  endView(request:EndViewRequest){
    this.httpClient.post('api/viewing/endView',request)
  }
}
