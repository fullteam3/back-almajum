import { ApiProperty } from '@nestjs/swagger';
import { IsInt } from 'class-validator';

export class CheckMedicineInteractionDto {
  @ApiProperty({
    example: 1,
    description: '약 ID',
  })
  @IsInt()
  medicineId: number;
}