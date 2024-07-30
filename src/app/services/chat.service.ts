import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {UserChatDto} from "../components/dto/users-chat.dto";
import {IdResponseDto} from "../components/dto/id-response.dto";

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

  createChat(usersChatDto: UserChatDto) {
    return this.httpClient.post<string>(`http://localhost:3000/chat`, usersChatDto);
  }
}
