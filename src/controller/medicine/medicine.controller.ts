import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { AddIngredientDto } from "src/domain/medicine/dto/add-ingredient.dto";
import { CreateMedicineDto } from "src/domain/medicine/dto/medicine.dto";
import { UpdateMedicineDto } from "src/domain/medicine/dto/update-medicine.dto";
import { AddSymptomDto } from "src/domain/symptom/dto/add-symptom.dto";
import { MedicineService } from "src/service/medicine/medicine.service";


@Controller('medicine')
export class MedicineController {
  constructor(private readonly medicineService: MedicineService) {}
  
  // 생성
  @Post()
  create(@Body() dto: CreateMedicineDto) {
    return this.medicineService.create(dto);
  }
  
  @Post(':id/ingredients')
  addIngredients(
    @Param('id') id: string,
    @Body() dto: AddIngredientDto
  ) {
    return this.medicineService.addIngredients(+id, dto.ingredientIds);
  }
  
  // 전체 조회
  @Get()
  findAll() {
    return this.medicineService.findAll();
  }

  @Get(':id')
findOne(@Param('id') id: string) {
  return this.medicineService.findOne(+id);
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

  @Post(':id/symptoms')
  addSymptoms(
    @Param('id') id: string,
    @Body() dto: AddSymptomDto
  ) {
    return this.medicineService.addSymptoms(+id, dto.symptomIds);
  }
}