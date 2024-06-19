import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable, tap} from "rxjs";
import {SignInResponse} from "../dto/sign-in-response.dto";
import Session from "supertokens-web-js/recipe/session";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public isAuthenticatedSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public isAuthenticated$: Observable<boolean> = this.isAuthenticatedSubject.asObservable();


  constructor(private readonly httpClient: HttpClient) {
    this.checkAuthStatus().then();
  }

  signIn(loginData: any): Observable<SignInResponse> {
    return this.httpClient.post<SignInResponse>(
      'http://localhost:3000/supertokens/signin',
      loginData
    )
  }

  async signOut() {
    await Session.signOut();
    this.isAuthenticatedSubject.next(false);
  }

  register(registerData: any) {
    return this.httpClient.post(
      'http://localhost:3000/supertokens/signup',
      registerData
    )
  }

  async checkAuthStatus() {
    const doesSessionExist = await Session.doesSessionExist();
    this.isAuthenticatedSubject.next(doesSessionExist);
  }

  async getAccessToken() {
    const session = await Session.doesSessionExist()

    if (session) {
      const tokenData = await Session.getAccessToken()

      const accountId = await Session.getUserId()
      const tokenDataJson = await Session.getAccessTokenPayloadSecurely()
      console.log(tokenDataJson)
    }

  }
}
