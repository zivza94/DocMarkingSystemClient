import { RemoveDocumentResponse } from './remove-document-response';
import { RemoveDocumentRequest } from './remove-document-request';

export class RemoveDocumentResponseInvalidDocID extends RemoveDocumentResponse {
    public request:RemoveDocumentRequest
}
