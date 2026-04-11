import { Module } from '@nestjs/common';
import { RecommendController } from 'src/controller/recommend/recommend.controller';
import { RecommendService } from 'src/service/recommend/recommend.service';
import { InteractionModule } from '../interaction/interaction.module';

@Module({
  imports: [InteractionModule],
  controllers: [RecommendController],
  providers: [RecommendService],
})
export class RecommendModule {}