import { ApiProperty } from "@nestjs/swagger";
import { InteractionType } from "@prisma/client";
import { IsEnum, IsInt, IsOptional, IsString } from "class-validator";

export class CreateInteractionDto {
  @ApiProperty()
  @IsInt()
  ingredient_a_id: number;

  @ApiProperty()
  @IsInt()
  ingredient_b_id: number;

  @ApiProperty({ enum: InteractionType })
  @IsEnum(InteractionType)
  type: InteractionType;

  @ApiProperty()
  @IsString()
  message: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  solution?: string;
}
