import { Module } from '@nestjs/common';
import { MemberModule } from '../member/member.module';
import { ChatGateway } from 'src/gateway/chat/chat.gateway';
import { ChatService } from 'src/service/chat/chat.service';
import { ChatController } from 'src/controller/chat/chat.controller';

@Module({
    imports: [MemberModule],
    providers: [ChatGateway, ChatService],
    controllers: [ChatController],
    exports: [ChatService]
})
export class ChatModule {;}
