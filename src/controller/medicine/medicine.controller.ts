import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { CreateMedicineDto } from "src/domain/medicine/dto/medicine.dto";
import { MedicineService } from "src/service/medicine/medicine.service";


@Controller('medicine')
export class MedicineController {
  constructor(private readonly medicineService: MedicineService) {}

  // 생성
  @Post()
  create(@Body() dto: CreateMedicineDto) {
    return this.medicineService.create(dto);
  }

  // 전체 조회
  @Get()
  findAll() {
    return this.medicineService.findAll();
  }

  // 수정
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() dto: Partial<CreateMedicineDto>,
  ) {
    return this.medicineService.update(Number(id),dto)
  }

  // 삭제
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.medicineService.delete(Number(id))
  }
}