import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private readonly httpClient: HttpClient) {
  }

  login(loginData: any) {
    return this.httpClient.post('http://localhost:3000/supertokens/login', loginData)
  }

  register(registerData: any) {
    return this.httpClient.post('http://localhost:3000/supertokens/signup', registerData)
  }
}
