import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {UserDto} from "../dto/user.dto";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private readonly httpClient: HttpClient) {
  }

  findUsersByPrimaryCultureId(cultureId: string): Observable<UserDto[]> {
    return this.httpClient.get<UserDto[]>(`http://localhost:3000/users/${cultureId}`)
  }
}
