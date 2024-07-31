export interface UserChatResponseDto {
  chatId: string;
  userOneId: string;
  userTwoId: string;
  userMessages: UserMessageDto[]
}


export interface UserMessageDto {
  chatId: string;
  senderId: string;
  content: string
  timestamp: Date
}
