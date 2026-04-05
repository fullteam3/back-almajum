import { Module } from "@nestjs/common";
import { PrismaModule } from "../prisma/prisma.module";
import { LiverImpactService } from "src/service/liver-impact/liver-impact.service";
import { LiverImpactRepository } from "src/repository/liver-impact/liver-impact.repository";
import { LiverImpactController } from "src/controller/liver-impact/liver-impact.controller";

@Module({
  imports: [PrismaModule],
  controllers: [LiverImpactController],
  providers: [LiverImpactService, LiverImpactRepository],
})
export class LiverImpactModule {}