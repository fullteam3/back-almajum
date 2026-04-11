import { Body, Controller, Post } from '@nestjs/common';
import { RecommendDto } from 'src/domain/recommend/dto/recommend.dto';
import { RecommendService } from 'src/service/recommend/recommend.service';

@Controller('recommend')
export class RecommendController {
  constructor(private readonly recommendService: RecommendService) {}

  @Post()
  recommend(@Body() dto: RecommendDto) {
    return this.recommendService.recommend(dto.symptomIds);
  }
}