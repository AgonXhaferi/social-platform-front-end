import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {CultureDto} from "../dto/culture.dto";
import {Observable} from "rxjs";
import {CulturesComponent} from "../cultures/cultures.component";
import {UserDto} from "../dto/user.dto";

@Injectable({
  providedIn: 'root'
})
export class CulturesService {

  constructor(private readonly httpClient: HttpClient) {
  }

  findCultureById(cultureId: string): Observable<CultureDto[]> {
    return this.httpClient.get<CultureDto[]>(`http://localhost:3000/culture`, {
      params: new HttpParams({
        fromObject: {
          cultureName: cultureId,
        }
      })
    })
  }
}
