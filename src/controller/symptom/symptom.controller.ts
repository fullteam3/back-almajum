import { Body, Controller, Get, Post } from '@nestjs/common';
import { SymptomService } from 'src/service/symptom/symptom.service';
import { CreateSymptomDto } from 'src/domain/symptom/dto/create-symptom.dto';

@Controller('symptom')
export class SymptomController {
  constructor(private readonly symptomService: SymptomService) {}

  @Post()
  create(@Body() dto: CreateSymptomDto) {
    return this.symptomService.create(dto);
  }

  @Get()
  findAll() {
    return this.symptomService.findAll();
  }
}