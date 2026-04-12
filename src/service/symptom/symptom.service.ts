import { Injectable, BadRequestException } from '@nestjs/common';
import { SymptomRepository } from 'src/repository/symptom/symptom.repository';
import { CreateSymptomDto } from 'src/domain/symptom/dto/create-symptom.dto';

@Injectable()
export class SymptomService {
  constructor(private readonly symptomRepository: SymptomRepository) {}

  async create(dto: CreateSymptomDto) {
    if (!dto.name) {
      throw new BadRequestException('증상 이름은 필수입니다');
    }

    return this.symptomRepository.create({
      name: dto.name,
    });
  }

  async findAll() {
    return this.symptomRepository.findAll();
  }

  
}