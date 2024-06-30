import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {CultureDto} from "../components/dto/culture.dto";
import {SubscribeToCultureDto} from "../components/dto/subscribe-to-culture.dto";

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

  subscribeToCulture(subscribeToCultureDto: SubscribeToCultureDto) {
    return this.httpClient.post<string>(`http://localhost:3000/culture/subscribe`, subscribeToCultureDto);
  }
}
