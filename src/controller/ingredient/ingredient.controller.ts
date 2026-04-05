import { Body, Controller, Post } from '@nestjs/common';
import { IngredientService } from '../../service/ingredient/ingredient.service';
import { AnalyzeIngredientDto } from 'src/domain/ingredient/dto/analyze-ingredient.dto';


@Controller('ingredient')
export class IngredientController {
  constructor(private readonly ingredientServie: IngredientService) {}

  @Post('analyze')
  analyze(@Body() dto: AnalyzeIngredientDto) {
    return this.ingredientServie.analyze(dto);
  }
}
