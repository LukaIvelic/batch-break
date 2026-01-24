import { IsInt, IsPositive, IsOptional, IsEnum } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ShipmentItemStatus } from '../../shipment-item/entities/shipmentItem.entity';

export class CreateShipmentItemDto {
  @ApiProperty({ description: 'Article ID' })
  @IsInt()
  @IsPositive()
  articleId: number;

  @ApiProperty({ description: 'Expected quantity' })
  @IsInt()
  @IsPositive()
  quantity: number;

  @ApiPropertyOptional({ description: 'Scanned quantity', default: 0 })
  @IsOptional()
  @IsInt()
  scannedQuantity?: number;

  @ApiPropertyOptional({
    description: 'Status of the shipment item',
    enum: ShipmentItemStatus,
    default: ShipmentItemStatus.PENDING,
  })
  @IsOptional()
  @IsEnum(ShipmentItemStatus)
  status?: ShipmentItemStatus;
}
