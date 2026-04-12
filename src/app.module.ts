import { Module } from '@nestjs/common';
import { MemberModule } from './module/member/member.module';
import { CoreModule } from './module/core/core.module';
import { AuthModule } from './module/auth/auth.module';
import { PrismaModule } from './module/prisma/prisma.module';
import { IngredientModule } from './module/ingredient/ingredient.module';
import { InteractionModule } from './module/interaction/interaction.module';
import { LiverImpactModule } from './module/liver-impact/liver-impact.module';
import { MedicineModule } from './module/medicine/medicine.module';
import { TimerService } from './service/timer/timer.service';
import { TimerController } from './controller/timer/timer.controller';
import { TimerModule } from './module/timer/timer.module';


@Module({
  imports: [
    CoreModule,
    MemberModule,
    AuthModule,
    PrismaModule,
    IngredientModule,
    InteractionModule,
    LiverImpactModule,
    MedicineModule,
    TimerModule
  ],
  providers: [],
  controllers: [],
})
export class AppModule {}
