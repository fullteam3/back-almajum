import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateSymptomDto {
    @ApiProperty({
        example: '두통',
        description: '증상 이름',
    })
    @IsString()
    name: string;
}