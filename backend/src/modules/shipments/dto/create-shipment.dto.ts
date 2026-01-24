import { IsOptional, IsEnum, IsArray, ValidateNested } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { ShipmentStatus } from '../entities/shipment.entity';
import { CreateShipmentItemDto } from './create-shipment-item.dto';

export class CreateShipmentDto {
  @ApiPropertyOptional({
    description: 'Shipment status',
    enum: ShipmentStatus,
    default: ShipmentStatus.DRAFT,
  })
  @IsOptional()
  @IsEnum(ShipmentStatus)
  status?: ShipmentStatus;

  @ApiPropertyOptional({
    description: 'Array of shipment items',
    type: [CreateShipmentItemDto],
  })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateShipmentItemDto)
  items?: CreateShipmentItemDto[];
}
