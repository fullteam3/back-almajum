import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatMessageDTO } from 'src/domain/chat/dto/chat.dto';
import { ChatService } from 'src/service/chat/chat.service';

@WebSocketGateway({cors: {origin: "http://localhost:3000"}})
export class ChatGateway {

    constructor(private readonly chatService: ChatService){;}

    @WebSocketServer()
    server: Server

    @SubscribeMessage('joinRoom')
    async handleJoinRoom(@MessageBody() roomId: string | number, @ConnectedSocket() client: Socket) {
        client.join(String(roomId))
    }

    @SubscribeMessage('privateMessage')
    async handlePrivateMessage(
        @MessageBody() message: ChatMessageDTO,
    ){
        const fromId = Number(message.fromId);
        const toId = Number(message.toId);

        const newMessage = {
            ...message,
            fromId: fromId,
            toId: toId
        }

        const saved = await this.chatService.saveMessage(newMessage)
        const payload = {
            fromId: String(saved.fromId),
            toId: String(saved.toId),
            content: saved.content,
            createAt: saved.createAt
        }

        // .emit(): 서버 소켓이 클라이언트 소켓으로 데이터를 전송시켜주는 메서드
        this.server.to(String(toId)).emit("privateMessage", payload)
        this.server.to(String(fromId)).emit("privateMessage", payload)
    }
}
