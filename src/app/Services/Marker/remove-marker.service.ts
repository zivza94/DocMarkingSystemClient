import { Injectable } from '@angular/core';
import { RemoveMarkerRequest } from 'src/app/DTO/Markers/remove-marker-request';
import { map } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { MarkerCommService } from './marker-comm.service';

@Injectable({
  providedIn: 'root'
})
export class RemoveMarkerService {

  ResponseSubjects: {[responseID:string]:Subject<any>} = {
    RemoveMarkerResponseOK: new Subject<any>(),
    RemoveMarkerResponseInvalidID:new Subject<any>(),
    AppResponseError: new Subject<any>()
  }
  constructor(private markerCommService:MarkerCommService) { }

  //get subjects
  get onRemoveMarkerOK(){
    return this.ResponseSubjects.RemoveMarkerResponseOK
  }
  get onRemoveMarkerInvalidID(){
    return this.ResponseSubjects.RemoveMarkerResponseInvalidID
  }
  get onResponseError(){
    return this.ResponseSubjects.AppResponseError
  }

  RemoveMarker(request:RemoveMarkerRequest){
    return this.markerCommService.RemoveMarker(request)
    .pipe(
      map(data => [data,this.ResponseSubjects[data.responseType]])
    ).subscribe(
        ([data,subject]) => subject.next(data),
        error => this.ResponseSubjects.AppResponseError.next(error),
        () => console.log("complete create marker")
        
    )
  }
}
