import { GetDocumentsResponse } from './get-documents-response';
import { GetDocumentsRequest } from './get-documents-request';

export class GetDocumentsResponseInvalidUserID extends GetDocumentsResponse {
    public request: GetDocumentsRequest
}
