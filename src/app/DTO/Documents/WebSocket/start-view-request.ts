export class StartViewRequest {
    RequestType:string
    DocID:string
    UserID:string
    constructor(docID:string,userID:string){
        this.RequestType = "StartViewRequest"
        this.DocID = docID;
        this.UserID = userID
    }
}
