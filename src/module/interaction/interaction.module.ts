import { Module } from "@nestjs/common";
import { PrismaModule } from 'src/module/prisma/prisma.module';
import { InteractionController } from "src/controller/interaction/interaction.controller";
import { InteractionService } from "src/service/interaction/interaction.service";
import { InteractionRepository } from "src/repository/interaction/interaction.repository";

@Module({
  imports: [PrismaModule],
  controllers: [InteractionController],
  providers: [InteractionService, InteractionRepository]
})

export class InteractionModule { }