import { Injectable } from '@nestjs/common';
import { MemberService } from '../member/member.service';
import { PrismaService } from '../prisma/prisma.service';
import { ChatMessageDTO, ChatRoomDTO } from 'src/domain/chat/dto/chat.dto';

@Injectable()
export class ChatService {
    constructor(
        private readonly memberService: MemberService,
        private readonly prisma: PrismaService
    ){}

    // 1. 메시지를 DB에 저장
    async saveMessage(chatMessage: ChatMessageDTO){
        return await this.prisma.chatMessage.create({
            data: chatMessage
        })
    }

    // 2. 과거의 메세지 내역 조회
    async getMessages(myId: number, partnerId: number){
        return await this.prisma.chatMessage.findMany({
            where: {
                OR: [
                    { fromId: myId, toId: partnerId },
                    { fromId: partnerId, toId: myId }
                ]
            },
            orderBy: { createAt: 'asc' }
        })
    }

    // 3. 채팅방 목록 전체 조회
    async getChatRooms(memberEmail: string){
        const member = await this.memberService.getMemberByMemberEmail(memberEmail);
        if(!member) return [];

        const myId = member.id;
        const messages = await this.prisma.chatMessage.findMany({
            where: {
                OR: [{ fromId: myId }, {toId: myId }]
            },
            orderBy: { createAt: "desc" }
        })

        // Record<key, value> 정의하는 type -> {key: value}
        const roomsObj: Record<number, ChatRoomDTO> = {}
        
        for(const message of messages){
            const otherId = message.fromId === myId ? message.toId : message.fromId;

            if(!roomsObj[otherId]){
                const otherMember = await this.memberService.getMember(otherId);
                roomsObj[otherId] = {
                    roomId: String(otherId),
                    withMember: otherMember ? otherMember.memberEmail : String(otherId),
                    lastMessage: message.content,
                    lastUpdated: message.createAt
                }
            }
        }
        return Object.values(roomsObj)
    }

    // 4. 채팅방 삭제
    async deleteChatRoom(myId: number, roomId: number){
        await this.prisma.chatMessage.deleteMany({
            where: {
                OR: [
                    { fromId: myId, toId: roomId },
                    { fromId: roomId, toId: myId }
                ]
            }
        })
    }
}
