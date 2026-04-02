import { IsArray, ArrayNotEmpty, IsInt } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AnalyzeIngredientDto {
  @ApiProperty({
    example: [1, 2, 3],
    description: '성분 ID 배열',
  })
  @IsArray()
  @ArrayNotEmpty()
  @IsInt({ each: true })
  ingredientIds: number[];
}
