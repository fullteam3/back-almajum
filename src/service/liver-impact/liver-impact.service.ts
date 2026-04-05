import { Injectable } from "@nestjs/common";
import { CreateLiverImpactDto } from "src/domain/liver-impact/dto/create-liver-impact.dto";
import { LiverImpactRepository } from "src/repository/liver-impact/liver-impact.repository";

@Injectable()
export class LiverImpactService {
  constructor(private readonly liverImpactRepository: LiverImpactRepository) {}

  async create(dto: CreateLiverImpactDto) {
    return this.liverImpactRepository.createLiverImpact(dto);
  }
}