import { Injectable, BadRequestException } from '@nestjs/common';

import { CreateInteractionDto } from 'src/domain/interaction/dto/create-interaction.dto';
import { InteractionRepository } from 'src/repository/interaction/interaction.repository';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class InteractionService {
  constructor(
    private readonly interactionRepository: InteractionRepository,
    private readonly prisma: PrismaService
    ,
  ) {}

  async create(dto: CreateInteractionDto) {
    const ingredientA = await this.prisma.ingredient.findUnique({
      where: { id: dto.ingredient_a_id },
    });

    const ingredientB = await this.prisma.ingredient.findUnique({
      where: { id: dto.ingredient_b_id },
    });

    if (!ingredientA || !ingredientB) {
      throw new BadRequestException('존재하지 않는 성분입니다.');
    }

    return this.interactionRepository.createInteraction(dto);
  }

  async findAll() {
    return this.interactionRepository.findAll();
  }
}