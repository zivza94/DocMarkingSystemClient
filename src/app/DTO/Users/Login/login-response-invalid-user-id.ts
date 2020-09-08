import { LoginResponse } from './login-response';
import { LoginRequest } from './login-request';

export class LoginResponseInvalidUserID extends LoginResponse {
    request:LoginRequest
}
