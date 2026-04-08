import { Injectable, BadRequestException } from '@nestjs/common';
import { Interaction } from '@prisma/client';


import { InteractionRepository } from 'src/repository/interaction/interaction.repository';
import { PrismaService } from '../prisma/prisma.service';
import { CreateInteractionDto } from 'src/domain/interaction/dto/create-interaction.dto';
import { MedicineIngredientRepository } from 'src/repository/medicine-ingredient/medicine-ingredient.repository';

@Injectable()
export class InteractionService {
  constructor(
    private readonly interactionRepository: InteractionRepository,
    private readonly prisma: PrismaService,
    private readonly medicineIngredientRepository: MedicineIngredientRepository
  ) {}

  async create(dto: CreateInteractionDto) {

    // 정렬 (핵심)
    const a = Math.min(dto.ingredient_a_id, dto.ingredient_b_id);
    const b = Math.max(dto.ingredient_a_id, dto.ingredient_b_id);

    const ingredientA = await this.prisma.ingredient.findUnique({
      where: { id: a },
    });

    const ingredientB = await this.prisma.ingredient.findUnique({
      where: { id: b },
    });

    if (!ingredientA || !ingredientB) {
      throw new BadRequestException('존재하지 않는 성분입니다.');
    }
  
    return this.interactionRepository.createInteraction({
      ...dto,
      ingredient_a_id: a,
      ingredient_b_id: b,
    });
  }

  async findPair(a: number, b: number) {
    return this.interactionRepository.findPair(a, b);
  }
  async findAll() {
    return this.interactionRepository.findAll();
  }

  async checkInteractions(ingredientIds: number[]) {
    const results: any[] = [];
  
    const liverImpacts = await this.prisma.ingredientLiverImpact.findMany({
      where: {
        ingredient_id: { in: ingredientIds },
      }
    });
  
    const maxLiverImpact = this.getMaxLiverImpact(liverImpacts);
  
    for (let i = 0; i < ingredientIds.length; i++) {
      for (let j = i + 1; j < ingredientIds.length; j++) {
        const a = ingredientIds[i];
        const b = ingredientIds[j];
  
        const interaction = await this.findPair(a, b);
  
        if (interaction) {
          results.push({
            ...interaction,
            liverImpact: maxLiverImpact,
          });
        }
      }
    }
  
    return results;
  }

  getMaxLiverImpact(liverImpacts: any[]) {
    if(!liverImpacts.length) return 'NONE';

    const priority = {
      NONE: 0,
      LOW: 1,
      MEDIUM: 2,
      HIGH: 3,
    };

    let max = "NONE";

    for(const item of liverImpacts) {
      if(priority[item.level] > priority[max]) {
        max = item.level;
      }
    }

    return max;
  }

  async checkByMedicine(medicineId: number) {
    // 1️⃣ 약의 성분 조회
    const medicineIngredients =
      await this.medicineIngredientRepository.findByMedicineId(medicineId);
  
    // 2️⃣ ingredientIds 추출
    const ingredientIds = medicineIngredients.map(
      (item) => item.ingredient_id,
    );
  
    // 3️⃣ 성분이 2개 미만이면 검사 불필요
    if (ingredientIds.length < 2) {
      return [];
    }
  
    // 4️⃣ 기존 로직 재사용
    return this.checkInteractions(ingredientIds);
  }
}