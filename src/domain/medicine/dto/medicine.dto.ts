import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsEnum, IsInt, IsOptional, IsString } from 'class-validator';

export enum MedicineType {
  OTC = 'OTC',
  SUPPLEMENT = 'SUPPLEMENT',
}

export class CreateMedicineDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ enum: MedicineType })
  @IsEnum(MedicineType)
  type: MedicineType;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsInt()
  category_id?: number;

  @ApiProperty({ example: [1, 2] })
  @IsArray()
  @IsInt({ each: true })
  ingredientIds: number[];
}
