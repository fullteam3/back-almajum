import { Injectable } from "@nestjs/common";
import { CreateTimerDTO, UpdateTimerDTO } from "src/domain/timer/dto/timer.dto";
import { PrismaService } from "src/service/prisma/prisma.service";

@Injectable()
export class TimerRepository {
   constructor(private readonly prisma:PrismaService){;}

   async save(memberId:number, timer:CreateTimerDTO):Promise<any> {
      return await this.prisma.timer.create({
         data: {
            member_id:memberId,
            medicine_id: timer.medicineId,
            intake_time: timer.intakeTime,
         },
      })
   }
   
   async findAllByMemberId(memberId: number) {
      return await this.prisma.timer.findMany({
         where: { member_id: memberId },
         include: { medicine: true } // 약 정보도 함께 가져오기
      });
   }

   // 특정 타이머 조회
   async findById(id: number) {
      return await this.prisma.timer.findUnique({
         where: { id }
      });
   }

   // 타이머 수정
   async update(id: number, timer: UpdateTimerDTO) {
      return await this.prisma.timer.update({
         where: { id },
         data: { intake_time: timer.intakeTime }
      });
   }

   // 타이머 삭제
   async delete(id: number) {
      return await this.prisma.timer.delete({
         where: { id }
      });
   }

}