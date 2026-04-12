import { ApiProperty } from '@nestjs/swagger';
import { IsArray, ArrayNotEmpty, IsInt } from 'class-validator';

export class CheckInteractionDto {
  @ApiProperty({
    example: [21, 22],
    description: '성분 ID 배열',
  })
  @IsArray()
  @ArrayNotEmpty()
  @IsInt({ each: true })
  ingredientIds: number[];
}