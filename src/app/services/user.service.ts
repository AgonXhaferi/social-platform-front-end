import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {UserDto} from "../components/dto/user.dto";

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
