import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ShipmentStatus } from '../entities/shipment.entity';
import { ShipmentItemResponseDto } from './shipment-item-response.dto';

export class ShipmentResponseDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  shipmentNumber: string;

  @ApiProperty()
  differentArticles: number;

  @ApiProperty()
  totalArticles: number;

  @ApiProperty()
  scannedArticles: number;

  @ApiProperty({ description: 'Progress percentage (0-100)' })
  progress: number;

  @ApiProperty({ enum: ShipmentStatus })
  status: ShipmentStatus;

  @ApiPropertyOptional({ type: [ShipmentItemResponseDto] })
  items?: ShipmentItemResponseDto[];

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
