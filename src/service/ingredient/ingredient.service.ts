import { Injectable } from '@nestjs/common';
import { AnalyzeIngredientDto } from 'src/domain/ingredient/dto/analyze-ingredient.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class IngredientService {
  constructor(private readonly prisma: PrismaService) {}

  async analyze(dto: AnalyzeIngredientDto) {
    const ids = dto.ingredientIds;

    // 1. 간 영향 조회
    const liverImpacts = await this.prisma.ingredientLiverImpact.findMany({
      where: {
        ingredient_id: { in: ids },
      },
    });

    // 2. 성분 조합 만들기
    const pairs: [number, number][] = [];
    for (let i = 0; i < ids.length; i++) {
      for (let j = i + 1; j < ids.length; j++) {
        const a = Math.min(ids[i], ids[j]);
        const b = Math.max(ids[i], ids[j]);
        pairs.push([a, b]);
      }
    }

    // 3. interaction 전체 조회 (한 번에)
    const interactions = await this.prisma.interaction.findMany({
      where: {
        OR: [
          { ingredient_a_id: { in: ids } },
          { ingredient_b_id: { in: ids } },
        ],
      },
    });

    // 4. pairs 기준 필터링
    const filteredInteractions = interactions.filter((item) =>
      pairs.some(
        ([a, b]) => item.ingredient_a_id === a && item.ingredient_b_id === b,
      ),
    );

    // 5. 결과 반환
    return {
      interactions: filteredInteractions,
      liverImpacts,
    };
  }
}
