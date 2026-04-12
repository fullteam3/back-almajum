import { ApiProperty } from '@nestjs/swagger';
import { IsArray, ArrayNotEmpty, IsInt } from 'class-validator';

export class RecommendDto {
  @ApiProperty({
    example: [1],
    description: '증상 ID 배열',
  })
  @IsArray()
  @ArrayNotEmpty()
  @IsInt({ each: true })
  symptomIds: number[];
}