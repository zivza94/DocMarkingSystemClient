import { CreateUserRequest } from './create-user-request';
import { CreateUserResponse } from './create-user-response';

export class CreateUserResponseUserIDExist extends CreateUserResponse {
    request: CreateUserRequest
}
