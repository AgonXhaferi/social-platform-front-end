import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable, tap} from "rxjs";
import Session from "supertokens-web-js/recipe/session";
import {AuthenticationResponse} from "../dto/response/sign-in-response.dto";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticatedSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public isAuthenticated$: Observable<boolean> = this.isAuthenticatedSubject.asObservable();

  constructor(private readonly httpClient: HttpClient) {
    this.updateAuthStatus()
  }

  signIn(loginData: any): Observable<AuthenticationResponse> {
    return this.httpClient.post<AuthenticationResponse>(
      'http://localhost:3000/supertokens/signin',
      loginData
    ).pipe(
      tap(() => this.updateAuthStatus())
    );
  }

  async signOut() {
    await Session.signOut();
    this.updateAuthStatus();
  }

  register(registerData: any): Observable<AuthenticationResponse> {
    return this.httpClient.post<AuthenticationResponse>(
      'http://localhost:3000/supertokens/signup',
      registerData
    ).pipe(
      tap(() => this.updateAuthStatus())
    );
  }

  async isAuthenticated(): Promise<boolean> {
    return await Session.doesSessionExist();
  }

  private async updateAuthStatus() {
    const isAuthenticated = await Session.doesSessionExist();
    this.isAuthenticatedSubject.next(isAuthenticated);
  }
}
