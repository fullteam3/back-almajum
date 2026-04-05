import { Injectable } from '@nestjs/common';
import { AnalyzeIngredientDto } from 'src/domain/ingredient/dto/analyze-ingredient.dto';
import { IngredientRepository } from 'src/repository/ingredient/ingredient.repository';

@Injectable()
export class IngredientService {
  constructor(private readonly ingredientRepository: IngredientRepository) {}

  async analyze(dto: AnalyzeIngredientDto) {
    const ids = dto.ingredientIds;

    // 1. 간 영향 조회 (repository)
    const liverImpacts = await this.ingredientRepository.findLiverImpacts(ids);

    // 2. 성분 조합 만들기
    const pairs: [number, number][] = [];
    for (let i = 0; i < ids.length; i++) {
      for (let j = i + 1; j < ids.length; j++) {
        const a = Math.min(ids[i], ids[j]);
        const b = Math.max(ids[i], ids[j]);
        pairs.push([a, b]);
      }
    }

    // 3. interaction 조회 (repository)
    const interactions = await this.ingredientRepository.findInteractions(ids);

    // 4. pairs 기준 필터링
    const filteredInteractions = interactions.filter((item) =>
      pairs.some(
        ([a, b]) => item.ingredient_a_id === a && item.ingredient_b_id === b,
      ),
    );

    return {
      interactions: filteredInteractions,
      liverImpacts,
    };
  }
}
