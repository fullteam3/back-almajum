export class ChatMessageDTO {
    fromId: number;
    toId: number;
    content: string;
    createAt?: Date;
}

export class ChatRoomDTO {
    roomId: string;
    withMember: string;
    lastMessage?: string;
    lastUpdated?: Date;
}