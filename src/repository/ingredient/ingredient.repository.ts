import { Injectable } from "@nestjs/common"
import { PrismaService } from "src/service/prisma/prisma.service"


@Injectable()
export class IngredientRepository {
  constructor(private readonly prisma: PrismaService) { }

  // 1. 간 영향 조회
  async findLiverImpacts(ids: number[]) {
    return this.prisma.ingredientLiverImpact.findMany({
      where: {
        ingredient_id: {in: ids},
      }
    })
  }

  // 2. interaction 상호작용 조회
  async findInteractions(ids: number[]) {
    return this.prisma.interaction.findMany({
      where: {
        OR: [
          { ingredient_a_id: { in: ids } },
          {ingredient_b_id: {in: ids}},
        ]
      }
    })
  }
}