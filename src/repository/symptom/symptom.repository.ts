import { PrismaService } from 'src/service/prisma/prisma.service';
import { Injectable } from '@nestjs/common';


@Injectable()
export class SymptomRepository {
    
    constructor(private readonly prisma: PrismaService) {}
    
    async create(data: { name: string }) {
        return this.prisma.symptom.create({
          data,
        });
      }
      
      async findAll() {
        return this.prisma.symptom.findMany();
      }
}

