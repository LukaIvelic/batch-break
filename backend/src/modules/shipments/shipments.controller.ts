import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
  NotFoundException,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { ShipmentsService } from './shipments.service';
import { CreateShipmentDto } from './dto/create-shipment.dto';
import { UpdateShipmentDto } from './dto/update-shipment.dto';
import { UpdateShipmentItemDto } from './dto/update-shipment-item.dto';
import { PaginationQueryDto } from './dto/pagination-query.dto';
import { ShipmentResponseDto } from './dto/shipment-response.dto';
import { PaginatedResponseDto } from './dto/paginated-response.dto';
import * as Dec from './shipments.decorators';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@ApiTags('shipments')
@Controller('shipments')
export class ShipmentsController {
  constructor(private readonly shipmentsService: ShipmentsService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(1, 3)
  @ApiBearerAuth()
  @Dec.ApiShipmentCreate()
  create(
    @Body() createShipmentDto: CreateShipmentDto,
  ): Promise<ShipmentResponseDto> {
    return this.shipmentsService.create(createShipmentDto);
  }

  @Post('scan/:barcode')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(1, 2, 3)
  @ApiBearerAuth()
  async scanArticle(@Param('barcode') barcode: string) {
    const item = await this.shipmentsService.scanArticle(barcode);
    if (!item) {
      throw new NotFoundException(
        `No pending shipment found for article with barcode ${barcode}`,
      );
    }
    return item;
  }

  @Get()
  @Dec.ApiShipmentFindAll()
  findAll(
    @Query() paginationQuery: PaginationQueryDto,
  ): Promise<PaginatedResponseDto<ShipmentResponseDto>> {
    return this.shipmentsService.findAll(paginationQuery);
  }

  @Get(':id')
  @Dec.ApiShipmentFindOne()
  async findOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ShipmentResponseDto> {
    const shipment = await this.shipmentsService.findOne(id);
    if (!shipment) {
      throw new NotFoundException(`Shipment with ID ${id} not found`);
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return shipment as any;
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(1, 3)
  @ApiBearerAuth()
  @Dec.ApiShipmentUpdate()
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateShipmentDto: UpdateShipmentDto,
  ): Promise<ShipmentResponseDto> {
    const shipment = await this.shipmentsService.update(id, updateShipmentDto);
    if (!shipment) {
      throw new NotFoundException(`Shipment with ID ${id} not found`);
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return shipment as any;
  }

  @Patch(':shipmentId/items/:itemId')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(1, 3)
  @ApiBearerAuth()
  @Dec.ApiShipmentUpdateItem()
  async updateItem(
    @Param('shipmentId', ParseIntPipe) shipmentId: number,
    @Param('itemId', ParseIntPipe) itemId: number,
    @Body() updateDto: UpdateShipmentItemDto,
  ) {
    const item = await this.shipmentsService.updateShipmentItem(
      shipmentId,
      itemId,
      updateDto,
    );
    if (!item) {
      throw new NotFoundException(
        `Shipment item with ID ${itemId} not found in shipment ${shipmentId}`,
      );
    }
    return item;
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(1, 3)
  @ApiBearerAuth()
  @Dec.ApiShipmentDelete()
  async delete(
    @Param('id', ParseIntPipe) id: number,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    @Body() _body?: Record<string, never>,
  ): Promise<void> {
    return this.shipmentsService.delete(id);
  }
}
