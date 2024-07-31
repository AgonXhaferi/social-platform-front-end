import {Component, OnDestroy, OnInit} from '@angular/core';
import {io, Socket} from "socket.io-client";
import {MatFormField, MatInput, MatLabel} from "@angular/material/input";
import {NgForOf} from "@angular/common";
import {ChatService} from "../../services/chat.service";
import {ActivatedRoute} from "@angular/router";
import {concatMap, from, zip} from "rxjs";
import {MessageDto} from "../dto/message.dto";
import Session from "supertokens-web-js/recipe/session";

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [
    MatInput,
    MatFormField,
    MatLabel,
    NgForOf
  ],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent implements OnInit, OnDestroy {
  socket?: Socket
  messages: string[] = [];

  userId: string | undefined
  selectedUserId: string | undefined//I'm thinking of just saving this on localStorage at this point. I'm making 100 calls.

  mainUsersMessages: MessageDto[] = []
  selectedUsersMessages: MessageDto[] = []

  constructor(private _chatService: ChatService,
              private _activatedRoute: ActivatedRoute,) {
  }

  ngOnInit(): void {
    this._activatedRoute.paramMap.pipe(
      concatMap(paramMap => {
        const chatId = paramMap.get('chatId')
        if (!chatId) {
          alert('chatId param missing')

          throw new Error('chatId param must be provided')
        }

        return zip([
            this._chatService.findChatById(chatId),
            from(Session.getUserId())
          ]
        )
      })
    ).subscribe(([
                   chat,
                   mainUserId
                 ]) => {
      if (chat.userOneId === mainUserId) { //TODO: Theres 1000% a better way to do this.
        this.userId = chat.userOneId
        this.selectedUserId = chat.userTwoId
      } else {
        this.userId = chat.userTwoId
        this.selectedUserId = chat.userOneId
      }

      chat.userMessages.forEach(userMessageDto => {
        if (userMessageDto.senderId === mainUserId) {
          this.mainUsersMessages.push(userMessageDto)
        } else {
          this.selectedUsersMessages.push(userMessageDto)
        }
      })

      this.socket = io('http://localhost:3001');
      this.socket.on('message', (data: string) => this.messageListener(data))
    })
  }

  send(messageValue: string) {
    debugger;
    this.socket?.emit('message', messageValue);
  }

  messageListener(messageValue: string) {
    this.messages = [...this.messages, messageValue];
  }

  ngOnDestroy(): void {
    if (this.socket?.active) {
      this.socket.close()
    }
  }
}
