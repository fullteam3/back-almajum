import { Module } from '@nestjs/common';
import { MemberModule } from './module/member/member.module';
import { CoreModule } from './module/core/core.module';
import { AuthModule } from './module/auth/auth.module';

import { IngredientController } from './controller/ingredient/ingredient.controller';
import { IngredientService } from './service/ingredient/ingredient.service';

@Module({
  imports: [
    CoreModule,
    MemberModule,
    AuthModule,
  ],
  controllers: [IngredientController],
  providers: [IngredientService],
})
export class AppModule {}
