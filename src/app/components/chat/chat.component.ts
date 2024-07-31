import {Component, OnDestroy, OnInit} from '@angular/core';
import {io, Socket} from "socket.io-client";
import {MatFormField, MatInput, MatLabel} from "@angular/material/input";
import {NgForOf} from "@angular/common";
import {ChatService} from "../../services/chat.service";
import {ActivatedRoute} from "@angular/router";

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

  constructor(private _chatService: ChatService,
              private _activatedRoute: ActivatedRoute,) {
  }

  ngOnInit(): void {
    debugger;
    this.socket = io('http://localhost:3001');

    this.socket.on('message', (data: string) => this.messageListener(data))
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
