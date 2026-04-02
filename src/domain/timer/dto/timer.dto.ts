import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateTimerDTO {
  @ApiProperty({ example: 1, description: "제품 아이디" })
  @IsNumber()
  @IsNotEmpty()
  medicineId: number;

  @ApiProperty({ example: "08:30", description: "복용 시간" })
  @IsString()
  @IsNotEmpty()
  intakeTime: string; //
}

export class UpdateTimerDTO {
  @ApiProperty({ example: "10:30", description: "수정된 복용 시간" })
  @IsString()
  @IsNotEmpty()
  intakeTime: string; 
}