import { ApiProperty } from "@nestjs/swagger";

export class InteractionDto {
  @ApiProperty() ingredient_a_id: number;
  @ApiProperty() ingredient_b_id: number;
  @ApiProperty({ example: 'CONFLICT' }) type: string;
  @ApiProperty() message: string;
  @ApiProperty({ required: false }) solution?: string;
}

export class LiverImpactDto{
  @ApiProperty() ingredient_id: number;
  @ApiProperty({ example: 'HIGH' }) impact_level: string;
  @ApiProperty() description: string;
  @ApiProperty() waring_message: string;
}

export class AnalyzeResponseDto{
  @ApiProperty({ type: [InteractionDto] })
  interactions: InteractionDto[];

  @ApiProperty({ type: [LiverImpactDto] })
  liverImpacts: LiverImpactDto[];
}