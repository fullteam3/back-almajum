import { Module } from "@nestjs/common";
import { PrismaModule } from "src/module/prisma/prisma.module";
import { MedicineIngredientRepository } from "src/repository/medicine-ingredient/medicine-ingredient.repository";

@Module({
  imports: [PrismaModule],
  providers: [MedicineIngredientRepository],
})
export class MedicineIngredientModule { }