import { Module } from '@nestjs/common';
import { RecommendController } from 'src/controller/recommend/recommend.controller';
import { RecommendService } from 'src/service/recommend/recommend.service';

@Module({
  controllers: [RecommendController],
  providers: [RecommendService],
})
export class RecommendModule {}