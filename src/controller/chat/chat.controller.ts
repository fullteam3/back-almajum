import { Controller, Delete, Get, Param, ParseIntPipe } from '@nestjs/common';
import { ApiResponse } from 'src/common/dto/api-response.dto';
import { ChatService } from 'src/service/chat/chat.service';

@Controller('chat')
export class ChatController {

    constructor(private readonly chatService:ChatService){;}

    // 1. 채팅방 목록 조회(이메일)
    @Get("rooms/:memberEmail")
    async getRooms(@Param("memberEmail") memberEmail: string){
        return await this.chatService.getChatRooms(memberEmail);
    }

    // 2. 특정 상대와 과거 메세지 내역 조회
    @Get("messages/:myId/:partnerId")
    async getMessages(
        @Param("myId", ParseIntPipe) myId: number,
        @Param("partnerId", ParseIntPipe) partnerId: number,
    ){
        return await this.chatService.getMessages(myId, partnerId)
    }

    // 3. 채팅방 삭제
    @Delete("rooms/:myId/:roomId")
    async deleteRoom(
        @Param("myId", ParseIntPipe) myId: number,
        @Param("roomId", ParseIntPipe) roomId: number,
    ){
        await this.chatService.deleteChatRoom(myId, roomId)
        return new ApiResponse("채팅방 종료", { success: true })
    }

}
