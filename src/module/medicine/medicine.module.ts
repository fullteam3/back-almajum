import { Module } from "@nestjs/common";
import { MedicineController } from "src/controller/medicine/medicine.controller";
import { MedicineRepository } from "src/repository/medicine/medicine.repository";
import { MedicineService } from "src/service/medicine/medicine.service";
import { PrismaService } from "src/service/prisma/prisma.service";

@Module({
  controllers: [MedicineController],
  providers: [MedicineService, MedicineRepository, PrismaService],
})

export class MedicineModule { }