import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsString } from "class-validator";

export class CreateLiverImpactDto {
  @ApiProperty()
  @IsInt()
  ingredient_id: number;

  @ApiProperty({ example: 'HIGE' })
  @IsString()
  impact_level: string;

  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsString()
  warning_message: string;
}