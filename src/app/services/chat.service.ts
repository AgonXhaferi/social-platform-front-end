import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {UserChatDto} from "../dto/users-chat.dto";
import {IdResponseDto} from "../dto/response/id-response.dto";
import {Observable} from "rxjs";
import {UserChatResponseDto} from "../dto/response/user-chat.response.dto";

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private readonly httpClient: HttpClient) {
  }

  doesChatExist(usersChatDto: UserChatDto) {
    debugger;
    return this.httpClient.get<IdResponseDto>(`http://localhost:3000/chat/exist`, {
      params: new HttpParams({
        fromObject: {
          userOneId: usersChatDto.userOneId,
          userTwoId: usersChatDto.userTwoId
        }
      })
    })
  }

  createChat(usersChatDto: UserChatDto): Observable<IdResponseDto> {
    return this.httpClient.post<IdResponseDto>(`http://localhost:3000/chat`, usersChatDto);
  }

  findChatById(id: string): Observable<UserChatResponseDto> {
    return this.httpClient.get<UserChatResponseDto>(`http://localhost:3000/chat/${id}`)
  }
}
