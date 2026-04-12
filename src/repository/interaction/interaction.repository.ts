import { Injectable } from "@nestjs/common";
import { InteractionType } from "@prisma/client";
import { PrismaService } from "src/service/prisma/prisma.service";


@Injectable()
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

  async findAll() {
    return this.prisma.interaction.findMany();
  }

  async findPair(a: number, b: number) {
    const min = Math.min(a, b);
    const max = Math.max(a, b);
  
    return this.prisma.interaction.findFirst({
      where: {
        ingredient_a_id: min,
        ingredient_b_id: max,
      },
    });
  }
}