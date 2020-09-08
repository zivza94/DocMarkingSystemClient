import { CreateUserResponse } from './create-user-response';
import { CreateUserRequest } from './create-user-request';

export class CreateUserResponseOK extends CreateUserResponse {
    request: CreateUserRequest
}
