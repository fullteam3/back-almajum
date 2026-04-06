import { Body, Controller, Post, Get } from "@nestjs/common";
import { CreateInteractionDto } from "src/domain/interaction/dto/create-interaction.dto";

import { InteractionService } from "src/service/interaction/interaction.service";

@Controller('interaction')
export class InteractionController {
  constructor(private readonly interactionService: InteractionService) {}

  @Post()
  create(@Body() dto: CreateInteractionDto) {
    return this.interactionService.create(dto);
  }

  @Get()
  findAll() {
    return this.interactionService.findAll();
  }
}