import { NotFoundException } from "@nestjs/common";
import { CreateMedicineDto } from "src/domain/medicine/dto/medicine.dto";
import { MedicineRepository } from "src/repository/medicine/medicine.repository";

export class MedicineSerive {
  constructor(private readonly medicineRepository: MedicineRepository) { }

  //생성
  async create(dto: CreateMedicineDto) {
    return this.medicineRepository.create(dto);
  }

  // 전체 조회
  async findAll() {
    return this.medicineRepository.findAll();
  }

  // 단건 조회
  async findById(id: number) {
    const medicine = await this.medicineRepository.findById(id);

    if (!medicine) {
      throw new NotFoundException('해당 약이 존재하지 않습니다');
    }
    return medicine;
  }

  // 수정
  async update(id: number, dto: Partial<CreateMedicineDto>) {
    await this.findById(id); // 존재 여부 체크
    return this.medicineRepository.update(id, dto);
  }

  // 삭제
  async delete(id: number) {
    await this.findById(id); //존재 여부 체크
    return this.medicineRepository.delete(id);
  }
}