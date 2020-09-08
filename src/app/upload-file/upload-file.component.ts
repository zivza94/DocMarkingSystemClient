import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { UploadFileRequest } from '../DTO/upload-file-request';
import { UploadFileService } from '../Services/UploadFile/upload-file.service';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.css']
})
export class UploadFileComponent implements OnInit {
  public message: string
  public progress:number
  fileName:string
  filePath:string
  @Output() public onUploadFinished = new EventEmitter();
  @Output() public onFileName = new EventEmitter();
  constructor(private uploadFileService:UploadFileService) { }
  ngOnInit(): void {
    this.uploadFileService.onUploadFileOK.subscribe(
      response => {
        this.message = "Successfully uploaded"
        this.filePath = response.dbPath
        this.onFileName.emit(this.fileName)
        this.onUploadFinished.emit(response.dbPath)
      }
    )
    this.uploadFileService.onUploadFileNoData.subscribe(
      response => console.log("File is empty")
    )
    this.uploadFileService.onResponseError.subscribe(
      response => console.log("Error in upload file,  " + response.message)
    )
  }
  uploadFile(files){
    if(files.length === 0){
      return;
    }

    let fileToUpload = <File>files[0]
      
    const formData = new FormData()
    this.fileName = fileToUpload.name
    formData.append('file',fileToUpload,this.fileName)
    var request:UploadFileRequest = new UploadFileRequest()
    request.formData = formData
    this.uploadFileService.UploadFile(request)
    
  }
  public createImgPath = () => {
    var image = `https://localhost:5001/${this.filePath}`;
    return image
  }


}
