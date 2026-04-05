import { Body, Controller, Post } from '@nestjs/common';
import { IngredientService } from '../../service/ingredient/ingredient.service';
import { AnalyzeIngredientDto } from 'src/domain/ingredient/dto/analyze-ingredient.dto';
import { CreateIngredientDto } from 'src/domain/ingredient/dto/create-ingredient.dto';


@Controller('ingredient')
export class IngredientController {
  constructor(private readonly ingredientService: IngredientService) {}

  @Post('analyze')
  analyze(@Body() dto: AnalyzeIngredientDto) {
    return this.ingredientService.analyze(dto);
  }

  @Post()
  create(@Body() dto: CreateIngredientDto) {
    return this.ingredientService.create(dto);
  }
}
