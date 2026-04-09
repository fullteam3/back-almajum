import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/service/prisma/prisma.service";

@Injectable()
export class MedicineIngredientRepository {
  constructor(private readonly prisma: PrismaService) {}

  //약에 성분 추가
  async create(medicineId: number, ingredientId: number) {
    return this.prisma.medicineIngredient.create({
        data: {
            medicine_id: medicineId,
            ingredient_id: ingredientId,
        }
    });
}
// 특정 약의 성분 조회 (핵심)
async findByMedicineId(medicineId: number) {
    return this.prisma.medicineIngredient.findMany({
        where: { medicine_id: medicineId },
        include: {
            ingredient: true, // 중요 (성분 정모 같이 가져오기 )
        },
    });
}

// 특정 성분이 포함된 약 조회
async findByIngredientId(ingredientId: number) {
    return this.prisma.medicineIngredient.findMany({
        where: { ingredient_id: ingredientId },
        include: {
            medicine: true, // 중요 (약 정보 같이 가져오기 )
        },
    });
}

// 약 성분 삭제
async delete(medicineId: number, ingredientId: number) {
    return this.prisma.medicineIngredient.deleteMany({
      where: {
        medicine_id: medicineId,
        ingredient_id: ingredientId,
      },
    });
  }
}