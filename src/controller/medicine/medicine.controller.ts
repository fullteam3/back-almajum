import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { CreateMedicineDto } from "src/domain/medicine/dto/medicine.dto";
import { UpdateMedicineDto } from "src/domain/medicine/dto/update-medicine.dto";
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
  @Body() dto: UpdateMedicineDto
) {
  return this.medicineService.update(+id, dto);
}

  // 삭제
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.medicineService.delete(Number(id))
  }
}