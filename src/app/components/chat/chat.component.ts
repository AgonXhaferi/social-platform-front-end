import {Component, OnDestroy, OnInit} from '@angular/core';
import {io, Socket} from "socket.io-client";
import {MatFormField, MatInput, MatLabel} from "@angular/material/input";
import {DatePipe, NgClass, NgForOf} from "@angular/common";
import {ChatService} from "../../services/chat.service";
import {ActivatedRoute} from "@angular/router";
import {concatMap, from, zip} from "rxjs";
import Session from "supertokens-web-js/recipe/session";
import {SendMessageDto} from "../../dto/send-message.dto";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [
    MatInput,
    MatFormField,
    MatLabel,
    NgForOf,
    FormsModule,
    NgClass,
    DatePipe
  ],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent implements OnInit, OnDestroy {
  socket?: Socket
  messages: SendMessageDto[] = [];

  userId: string | undefined
  chatId: string | null | undefined
  newMessage: string | undefined;

  constructor(private _chatService: ChatService,
              private _activatedRoute: ActivatedRoute,) {
  }

  ngOnInit(): void {
    this.socket = io('http://localhost:3001');
    this.socket.on('message', (data: SendMessageDto) => this.messageListener(data))

    this._activatedRoute.paramMap.pipe(
      concatMap(paramMap => {
        this.chatId = paramMap.get('chatId')
        if (!this.chatId) {
          alert('chatId param missing')

          throw new Error('chatId param must be provided')
        }

        debugger;
        return zip([
            this._chatService.findChatById(this.chatId),
            from(Session.getUserId())
          ]
        )
      })
    ).subscribe(([
                   chat,
                   mainUserId
                 ]) => {
      this.messages = chat.userMessages
      this.userId = mainUserId
    })
  }

  send(messageValue: string) {
    this.socket?.emit('message', <SendMessageDto>{
      content: messageValue,
      senderId: this.userId,
      timestamp: new Date(),
      chatId: this.chatId
    });

    this.newMessage = ""
  }

  messageListener(messageValue: SendMessageDto) {
    this.messages = [...this.messages, messageValue];
  }

  ngOnDestroy(): void {
    if (this.socket?.active) {
      this.socket.close()
    }
  }

  sendMessage() {
    if (this.newMessage && this.newMessage.length > 0) {
      this.send(this.newMessage)
    }
  }
}
