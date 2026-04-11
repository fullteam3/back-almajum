import { Module } from '@nestjs/common';
import { SymptomController } from 'src/controller/symptom/symptom.controller';
import { SymptomService } from 'src/service/symptom/symptom.service';
import { SymptomRepository } from 'src/repository/symptom/symptom.repository';
import { PrismaModule } from 'src/module/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [SymptomController],
  providers: [SymptomService, SymptomRepository],
})
export class SymptomModule {}