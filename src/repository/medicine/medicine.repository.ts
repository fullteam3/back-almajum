import { CreateMedicineDto } from "src/domain/medicine/dto/medicine.dto";
import { PrismaService } from "src/service/prisma/prisma.service";

export class MedicineRepository{
  constructor(private readonly prisma: PrismaService) { }
  
  async create(data: CreateMedicineDto) {
    return this.prisma.medicine.create({
      data,
    })
  }

  async findAll() {
    return this.prisma.medicine.findMany();
  }

  async findById(id: number) {
    return this.prisma.medicine.findUnique({
      where:{id},
    })
  }

  async update(id: number, data: Partial<CreateMedicineDto>) {
    return this.prisma.medicine.update({
      where: { id },
      data,
    })
  }

  async delete(id: number) {
    return this.prisma.medicine.delete({
      where: {id},
    })
  }
}