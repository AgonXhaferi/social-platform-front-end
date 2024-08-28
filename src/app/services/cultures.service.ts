import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {CultureDto} from "../dto/culture.dto";
import {UserSubscriptionDto} from "../dto/user-subscription.dto";
import {CultureArticleResponseDto} from "../dto/response/culture-article-response.dto";
import {GetLatestArticlesRequestDto} from "../dto/get-latest-articles-request.dto";
import {GetLatestEventsRequestDto} from "../dto/get-latest-events-request.dto";
import {CultureEventResponseDto} from "../dto/response/culture-event-response.dto";
import {CreateCultureArticleRequestDto} from "../dto/request/create-culture-article-request.dto";
import {CreateCultureEventRequestDto} from "../dto/request/create-culture-event-request.dto";

@Injectable({
  providedIn: 'root'
})
export class CulturesService {

  constructor(private readonly httpClient: HttpClient) {
  }

  findCultureById(cultureId: string): Observable<CultureDto[]> {
    return this.httpClient.get<CultureDto[]>(`http://localhost:3000/culture/name`, {
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

  getLatestArticles(getLatestArticlesDto: GetLatestArticlesRequestDto): Observable<CultureArticleResponseDto[]> {
    debugger;
    return this.httpClient.get<CultureArticleResponseDto[]>(`http://localhost:3000/culture/find-latest-articles`, {
      params: new HttpParams({
        fromObject: {
          cultureName: getLatestArticlesDto.cultureName,
          numberOfArticles: getLatestArticlesDto.numberOfArticles
        }
      })
    })
  }

  findArticleByTitle(searchQuery: string, cultureName: string) {
    debugger;
    return this.httpClient.get<CultureArticleResponseDto[]>(`http://localhost:3000/culture/find-article-by-title`, {
      params: new HttpParams({
        fromObject: {
          cultureName,
          title: searchQuery
        }
      })
    })
  }

  getLatestEvents(getLatestEventsDto: GetLatestEventsRequestDto): Observable<CultureEventResponseDto[]> {
    return this.httpClient.get<CultureEventResponseDto[]>(`http://localhost:3000/culture/find-latest-events`, {
      params: new HttpParams({
        fromObject: {
          cultureName: getLatestEventsDto.cultureName,
          numberOfEvents: getLatestEventsDto.numberOfEvents
        }
      })
    })
  }

  findEventByTitle(searchQuery: string, cultureName: string): Observable<CultureEventResponseDto[]> {
    return this.httpClient.get<CultureEventResponseDto[]>(`http://localhost:3000/culture/find-event-by-name`, {
      params: new HttpParams({
        fromObject: {
          cultureName,
          eventName: searchQuery
        }
      })
    })
  }

  createArticle(value: CreateCultureArticleRequestDto): Observable<string> {
    return this.httpClient.post<string>(`http://localhost:3000/culture/article`, value, {})
  }

  createEvent(value: CreateCultureEventRequestDto): Observable<string> {
    debugger
    console.log(value)
    return this.httpClient.post<string>(`http://localhost:3000/culture/event`, value, {})
  }

  getAllCultures(): Observable<CultureEventResponseDto[]> {
    return this.httpClient.get<CultureEventResponseDto[]>(`http://localhost:3000/culture`)
  }
}
