import { Module } from "@nestjs/common";
import { PrismaModule } from 'src/module/prisma/prisma.module';
import { IngredientController } from "src/controller/ingredient/ingredient.controller";
import { IngredientService } from "src/service/ingredient/ingredient.service";
import { IngredientRepository } from "src/repository/ingredient/ingredient.repository";

@Module({
  imports: [PrismaModule],
  controllers: [IngredientController],
  providers: [IngredientService, IngredientRepository]
})

export class IngredientModule { }