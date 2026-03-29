import { ApiProperty } from "@nestjs/swagger";
import { IsInt } from "class-validator";

export class IngredientParamDto {
  @ApiProperty({
    example: 1,
    description: '성분 ID',
  })
  @IsInt()
  id: number;
}