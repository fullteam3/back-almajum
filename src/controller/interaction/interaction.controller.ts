import { Body, Controller, Post } from "@nestjs/common";
import { CreateInteractionDto } from "src/domain/interaction/dto/interaction.dto";
import { InteractionService } from "src/service/interaction/interaction.service";

@Controller('interaction')
export class InteractionConteroller {
  constructor(private readonly interactionService: InteractionService) {}

  @Post()
  create(@Body() dto: CreateInteractionDto) {
    return this.interactionService.create(dto);
  }
}