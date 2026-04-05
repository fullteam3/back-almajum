import { Module } from "@nestjs/common";
import { PrismaModule } from 'src/module/prisma/prisma.module';
import { InteractionConteroller } from "src/controller/interaction/interaction.controller";
import { InteractionService } from "src/service/interaction/interaction.service";
import { InteractionRepository } from "src/repository/interaction/interaction.repository";

@Module({
  imports: [PrismaModule],
  controllers: [InteractionConteroller],
  providers: [InteractionService, InteractionRepository]
})

export class InteractionModule { }