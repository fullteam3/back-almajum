import { PrismaService } from "src/service/prisma/prisma.service";

export class IngredientRepository {
  constructor(private readonly prisma: PrismaService) { }

  async findLiverImpacts(ids: number[]) {
    return this.prisma.ingredientLiverImpact.findMany({
      where: {
        ingredient_id: {in: ids},
      }
    })
  }
}