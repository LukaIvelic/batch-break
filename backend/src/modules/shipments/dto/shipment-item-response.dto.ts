import { ApiProperty } from '@nestjs/swagger';
import { ShipmentItemStatus } from '../../shipment-item/entities/shipmentItem.entity';
import { Article } from '../../articles/entities/article.entity';

export class ShipmentItemResponseDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  quantity: number;

  @ApiProperty()
  scannedQuantity: number;

  @ApiProperty({ enum: ShipmentItemStatus })
  status: ShipmentItemStatus;

  @ApiProperty({ type: () => Article })
  article: Article;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
