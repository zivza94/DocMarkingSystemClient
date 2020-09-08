import { Injectable } from '@angular/core';
import { MarkerCommService } from './marker-comm.service';
import { Subject } from 'rxjs';
import { GetMarkersRequest } from 'src/app/DTO/Markers/get-markers-request';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GetMarkersService {
  ResponseSubjects: {[responseID:string]:Subject<any>} = {
    GetMarkersResponseOk: new Subject<any>(),
    GetMarkersResponseInvalidDocID:new Subject<any>(),
    AppResponseError: new Subject<any>()
  }
  constructor(private markerCommService:MarkerCommService) { }

  //get subjects
  get onGetMarkersOK(){
    return this.ResponseSubjects.GetMarkersResponseOk
  }
  get onGetMarkersInvalidDocID(){
    return this.ResponseSubjects.GetMarkersResponseInvalidDocID
  }
  get onResponseError(){
    return this.ResponseSubjects.AppResponseError
  }

  GetMarkers(request:GetMarkersRequest){
    return this.markerCommService.GetMarkers(request)
    .pipe(
      map(data => [data,this.ResponseSubjects[data.responseType]])
    ).subscribe(
        ([data,subject]) => subject.next(data),
        error => this.ResponseSubjects.AppResponseError.next(error),
        () => console.log("complete get marker")
        
    )
  }
}
