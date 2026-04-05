import { PrismaService } from "src/service/prisma/prisma.service";

export class LiverImpactRepository{
  constructor(private readonly prisma: PrismaService) { }
  
  async createLiverImpact(data: {
    ingredient_id: number;
    impact_level: string;
    description: string;
    warning_message: string;
  }) {
    return this.prisma.ingredientLiverImpact.create({
      data,
    })
  }
}