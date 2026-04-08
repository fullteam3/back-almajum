import { ApiProperty, PickType } from '@nestjs/swagger';
import { CreateBasketDto } from './create-basket.dto';

// CreateBasketDto에서 quantity만 골라내어 수정용으로 사용
export class UpdateBasketDto extends PickType(CreateBasketDto, ['quantity'] as const) {
}