import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Document } from '../DTO/Documents/document';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {

  constructor() { }
  private userIDSource = new BehaviorSubject<string>(undefined)
  currentUserID = this.userIDSource.asObservable()
  changeUserID(userID: string) {
    this.userIDSource.next(userID)
  }

  private docSource = new BehaviorSubject<Document>(undefined)
  currentDoc = this.docSource.asObservable()
  changeDoc(doc:Document) {
    this.docSource.next(doc)
  }
}
