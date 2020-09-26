export class EndViewRequest {
    RequestType:string
    DocID:string
    UserID:string
    constructor(docID:string,userID:string){
        this.RequestType = "EndViewRequest"
        this.DocID = docID;
        this.UserID = userID
    }
}
