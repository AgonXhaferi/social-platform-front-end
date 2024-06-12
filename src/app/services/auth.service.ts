import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private readonly httpClient: HttpClient) {
  }

  signIn(loginData: any) {
    return this.httpClient.post('http://localhost:3000/supertokens/signin', loginData)
  }

  register(registerData: any) {
    return this.httpClient.post('http://localhost:3000/supertokens/signup', registerData)
  }
}
