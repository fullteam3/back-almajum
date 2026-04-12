import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, Matches } from 'class-validator';

export class CreateTimerDTO {
  @ApiProperty({ example: 1, description: '제품 아이디' })
  @IsNumber()
  @IsNotEmpty()
  medicineId: number;

  @ApiProperty({ example: '08:30', description: '복용 시간 (HH:mm 형식)' })
  @IsString()
  @IsNotEmpty()
  @Matches(/^([01]\d|2[0-3]):([0-5]\d)$/, {
    message: '시간은 HH:mm 형식이어야 합니다. (예: 08:30)',
  })
  intakeTime: string;
}

export class UpdateTimerDTO {
  @ApiProperty({ example: '10:30', description: '수정된 복용 시간(HH:mm 형식)' })
  @IsString()
  @IsNotEmpty()
  @Matches(/^([01]\d|2[0-3]):([0-5]\d)$/, {
    message: '시간은 HH:mm 형식이어야 합니다. (예: 08:30)',
  })
  intakeTime: string;
}
