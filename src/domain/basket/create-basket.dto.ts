import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsPositive, Min } from 'class-validator';

export class CreateBasketDto {
  @ApiProperty({ 
    description: '장바구니에 담을 약의 고유 ID (tbl_medicine 테이블 참조)', 
    example: 1 
  })
  @IsInt()
  @IsPositive()
  medicineId!: number;

  @ApiProperty({ 
    description: '담을 약의 수량', 
    example: 2,
    default: 1 
  })
  @IsInt()
  @Min(1)
  quantity!: number;
}