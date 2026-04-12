import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/service/prisma/prisma.service';
import { InteractionService } from 'src/service/interaction/interaction.service';

@Injectable()
export class RecommendService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly interactionService: InteractionService,
  ) {}

  async recommend(symptomIds: number[]) {
    
    // 1️⃣ symptom → medicine 찾기
    const medicines = await this.prisma.medicine.findMany({
      where: {
        symptoms: {
          some: {
            symptom_id: { in: symptomIds },
          },
        },
      },
      include: {
        medicineIngredients: {
          include: {
            ingredient: true,
          },
        },
      },
    });

    // 2️⃣ ingredient 모으기
    const ingredientIds = medicines.flatMap(m =>
      m.medicineIngredients.map(mi => mi.ingredient_id),
    );

    // 3️⃣ interaction 검사
    const interactions = await this.interactionService.checkInteractions(
      ingredientIds,
    );

    // 4️⃣ 결과 가공
    return medicines.map(m => ({
      id: m.id,
      name: m.name,
      ingredients: m.medicineIngredients.map(mi => mi.ingredient),
      isSafe: interactions.length === 0,
      interactions,
    }));
  }
}