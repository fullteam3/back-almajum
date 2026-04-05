import { Body, Controller, Post } from "@nestjs/common";
import { CreateLiverImpactDto } from "src/domain/liver-impact/dto/create-liver-impact.dto";
import { LiverImpactService } from "src/service/liver-impact/liver-impact.service";

@Controller('liver-impact')
export class LiverImpactController {
  constructor(private readonly liverImpactService: LiverImpactService) { }

  @Post()
  create(@Body() dto: CreateLiverImpactDto) {
    return this.liverImpactService.create(dto);
  }
}