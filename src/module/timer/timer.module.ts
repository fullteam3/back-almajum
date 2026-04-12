import { Module } from '@nestjs/common';
import { TimerController } from 'src/controller/timer/timer.controller';
import { TimerService } from 'src/service/timer/timer.service';
import { TimerRepository } from 'src/repository/timer/timer.repository';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
    imports: [PrismaModule],
    controllers: [TimerController],
    providers: [TimerService, TimerRepository],
    exports: [TimerService, TimerRepository]
})
export class TimerModule {}