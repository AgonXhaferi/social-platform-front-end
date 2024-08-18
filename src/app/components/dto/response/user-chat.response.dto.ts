import {SendMessageDto} from "../send-message.dto";

export interface UserChatResponseDto {
  chatId: string;
  userOneId: string;
  userTwoId: string;
  userMessages: SendMessageDto[]
}
