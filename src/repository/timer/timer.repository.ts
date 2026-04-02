import { Injectable } from "@nestjs/common";
import { CreateTimerDTO } from "src/domain/timer/dto/timer.dto";
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
   
}