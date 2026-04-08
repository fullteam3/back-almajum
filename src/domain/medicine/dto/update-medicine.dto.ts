import { PartialType } from "@nestjs/swagger";
import { CreateMedicineDto } from "./medicine.dto";

export class UpdateMedicineDto extends PartialType(CreateMedicineDto) {}