import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {UserChatDto} from "../components/dto/users-chat.dto";

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private readonly httpClient: HttpClient) {
  }

  doesChatExist(usersChatDto: UserChatDto) {
    return this.httpClient.get<boolean>(`http://localhost:3000/chat/exist`, {
      params: new HttpParams({
        fromObject: {
          userOneId: usersChatDto.userOneId,
          userTwoId: usersChatDto.userTwoId
        }
      })
    })
  }
}
