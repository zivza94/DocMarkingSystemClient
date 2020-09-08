import { GetDocumentsResponse } from './get-documents-response';
import { Document } from '../document';

export class GetDocumentsResponseOK extends GetDocumentsResponse {
    public documents:Array<Document>
}
