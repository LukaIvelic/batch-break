import { IsInt, IsOptional, IsEnum, Min } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { ShipmentItemStatus } from '../../shipment-item/entities/shipmentItem.entity';

export class UpdateShipmentItemDto {
  @ApiPropertyOptional({ description: 'Expected quantity' })
  @IsOptional()
  @IsInt()
  @Min(0)
  quantity?: number;

  @ApiPropertyOptional({ description: 'Scanned quantity' })
  @IsOptional()
  @IsInt()
  @Min(0)
  scannedQuantity?: number;

  @ApiPropertyOptional({
    description: 'Status of the shipment item',
    enum: ShipmentItemStatus,
  })
  @IsOptional()
  @IsEnum(ShipmentItemStatus)
  status?: ShipmentItemStatus;
}
