import { InteractionType } from "@prisma/client";
import { PrismaService } from "src/service/prisma/prisma.service";

export class InteractionRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createInteraction(data: {
    ingredient_a_id: number;
    ingredient_b_id: number;
    type: InteractionType;
    message: string;
    solution?: string;
  }) {
    return this.prisma.interaction.create({
      data,
    })
  }
}