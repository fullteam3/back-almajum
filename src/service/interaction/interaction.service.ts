import { Injectable } from '@nestjs/common';
import { CreateInteractionDto } from 'src/domain/interaction/dto/interaction.dto';

import { InteractionRepository } from 'src/repository/interaction/interaction.repository';

@Injectable()
export class InteractionService {
  constructor(private readonly interactionRepository: InteractionRepository) {}

  async create(dto: CreateInteractionDto) {
    return this.interactionRepository.createInteraction(dto);
  }
}
