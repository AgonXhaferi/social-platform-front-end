import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {CultureDto} from "../components/dto/culture.dto";
import {UserSubscriptionDto} from "../components/dto/user-subscription.dto";

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

  subscribeToCulture(userSubscriptionDto: UserSubscriptionDto) {
    return this.httpClient.post<string>(`http://localhost:3000/culture/subscribe`, userSubscriptionDto);
  }

  findIsUserSubscribedToCulture(userSubscriptionDto: UserSubscriptionDto) {
    return this.httpClient.get<boolean>(`http://localhost:3000/culture/is-subscribed`, {
      params: new HttpParams({
        fromObject: {
          cultureName: userSubscriptionDto.cultureId,
          userId: userSubscriptionDto.userId
        }
      })
    })
  }
}
