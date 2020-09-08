import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { MarkerCommService } from './marker-comm.service';
import { CreateMarkerRequest } from 'src/app/DTO/Markers/create-marker-request';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CreateMarkerService {
  ResponseSubjects: {[responseID:string]:Subject<any>} = {
    CreateMarkerResponseOK: new Subject<any>(),
    CreateMarkerResponseInvalidDocID:new Subject<any>(),
    CreateMarkerResponseInvalidUserID:new Subject<any>(),
    CreateMarkerResponseInvalidMarkerType:new Subject<any>(),
    AppResponseError: new Subject<any>()
  }
  constructor(private markerCommService:MarkerCommService) { }

  //get subjects
  get onCreateMarkerOK(){
    return this.ResponseSubjects.CreateMarkerResponseOK
  }
  get onCreateMarkerInvalidDocID(){
    return this.ResponseSubjects.CreateMarkerResponseInvalidDocID
  }
  get onCreateMarkerInvalidUserID(){
    return this.ResponseSubjects.CreateMarkerResponseInvalidUserID
  }
  get onCreateMarkerInvalidMarkerType(){
    return this.ResponseSubjects.CreateMarkerResponseInvalidMarkerType
  }
  get onResponseError(){
    return this.ResponseSubjects.AppResponseError
  }

  CreateMarker(request:CreateMarkerRequest){
    return this.markerCommService.CreateMarker(request)
    .pipe(
      map(data => [data,this.ResponseSubjects[data.responseType]])
    ).subscribe(
        ([data,subject]) => subject.next(data),
        error => this.ResponseSubjects.AppResponseError.next(error),
        () => console.log("complete create marker")
        
    )
  }

}
