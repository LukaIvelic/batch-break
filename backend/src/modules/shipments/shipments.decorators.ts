import { applyDecorators, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiParam, ApiQuery } from '@nestjs/swagger';
import { ShipmentResponseDto } from './dto/shipment-response.dto';
import { ShipmentStatus } from './entities/shipment.entity';

export function ApiShipmentCreate() {
  return applyDecorators(
    ApiOperation({ summary: 'Create a new shipment' }),
    ApiResponse({
      status: 201,
      description: 'Shipment created successfully',
      type: ShipmentResponseDto,
    }),
    ApiResponse({
      status: 400,
      description: 'Bad request - validation failed',
    }),
  );
}

export function ApiShipmentFindAll() {
  return applyDecorators(
    ApiOperation({ summary: 'Get paginated list of shipments' }),
    ApiQuery({
      name: 'page',
      required: false,
      description: 'Page number (default: 1)',
      example: 1,
    }),
    ApiQuery({
      name: 'limit',
      required: false,
      description: 'Items per page (default: 10)',
      example: 10,
    }),
    ApiQuery({
      name: 'search',
      required: false,
      description: 'Search term to filter shipments',
    }),
    ApiQuery({
      name: 'status',
      required: false,
      enum: ShipmentStatus,
      description: 'Filter by shipment status',
    }),
    ApiResponse({ status: 200, description: 'Paginated list of shipments' }),
  );
}

export function ApiShipmentFindOne() {
  return applyDecorators(
    ApiOperation({ summary: 'Get a shipment by ID with all items' }),
    ApiParam({ name: 'id', description: 'Shipment ID' }),
    ApiResponse({
      status: 200,
      description: 'Shipment found',
      type: ShipmentResponseDto,
    }),
    ApiResponse({ status: 404, description: 'Shipment not found' }),
  );
}

export function ApiShipmentUpdate() {
  return applyDecorators(
    ApiOperation({ summary: 'Update a shipment' }),
    ApiParam({ name: 'id', description: 'Shipment ID' }),
    ApiResponse({
      status: 200,
      description: 'Shipment updated successfully',
      type: ShipmentResponseDto,
    }),
    ApiResponse({ status: 400, description: 'Bad request' }),
    ApiResponse({ status: 404, description: 'Shipment not found' }),
  );
}

export function ApiShipmentDelete() {
  return applyDecorators(
    HttpCode(HttpStatus.NO_CONTENT),
    ApiOperation({ summary: 'Delete a shipment' }),
    ApiParam({ name: 'id', description: 'Shipment ID' }),
    ApiResponse({ status: 204, description: 'Shipment deleted successfully' }),
    ApiResponse({ status: 404, description: 'Shipment not found' }),
  );
}

export function ApiShipmentUpdateItem() {
  return applyDecorators(
    ApiOperation({
      summary: 'Update a shipment item (e.g., update scanned quantity)',
    }),
    ApiParam({ name: 'shipmentId', description: 'Shipment ID' }),
    ApiParam({ name: 'itemId', description: 'Shipment Item ID' }),
    ApiResponse({
      status: 200,
      description: 'Shipment item updated successfully',
    }),
    ApiResponse({ status: 404, description: 'Shipment or item not found' }),
  );
}
