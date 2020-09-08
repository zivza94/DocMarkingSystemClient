import { RemoveUserResponse } from './remove-user-response';
import { RemoveUserRequest } from './remove-user-request';

export class RemoveUserResponseUserIDNotExists extends RemoveUserResponse{
    request: RemoveUserRequest
}
