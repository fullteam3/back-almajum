import { Body, Controller, Post, Get, Query } from "@nestjs/common";
import { CheckInteractionDto } from "src/domain/check-interaction/dto/check-interaction.dto";

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
  
  @Get('pair')
  findPair(
    @Query('a') a: string,
    @Query('b') b: string,
  ) {
    return this.interactionService.findPair(Number(a), Number(b));
  }

  @Post('check')
check(@Body() dto: CheckInteractionDto) {
  return this.interactionService.checkInteractions(dto.ingredientIds);
}
}