import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Shipment, ShipmentStatus } from './entities/shipment.entity';
import { ShipmentItem } from '../shipment-item/entities/shipmentItem.entity';
import { Article } from '../articles/entities/article.entity';
import { CreateShipmentDto } from './dto/create-shipment.dto';
import { UpdateShipmentDto } from './dto/update-shipment.dto';
import { UpdateShipmentItemDto } from './dto/update-shipment-item.dto';
import { PaginationQueryDto } from './dto/pagination-query.dto';
import { PaginatedResponseDto } from './dto/paginated-response.dto';
import { ShipmentResponseDto } from './dto/shipment-response.dto';

@Injectable()
export class ShipmentsService {
  constructor(
    @InjectRepository(Shipment)
    private readonly shipmentRepository: Repository<Shipment>,
    @InjectRepository(ShipmentItem)
    private readonly shipmentItemRepository: Repository<ShipmentItem>,
    @InjectRepository(Article)
    private readonly articleRepository: Repository<Article>,
  ) {}

  async create(createShipmentDto: CreateShipmentDto): Promise<Shipment> {
    const shipment = this.shipmentRepository.create({
      status: createShipmentDto.status || ShipmentStatus.DRAFT,
    });

    const savedShipment = await this.shipmentRepository.save(shipment);

    if (createShipmentDto.items && createShipmentDto.items.length > 0) {
      await this.addItemsToShipment(savedShipment.id, createShipmentDto.items);
    }

    const result = await this.findOne(savedShipment.id);
    if (!result) {
      throw new NotFoundException(
        `Shipment with ID ${savedShipment.id} not found`,
      );
    }
    return result;
  }

  private async addItemsToShipment(
    shipmentId: number,
    items: Array<{
      articleId: number;
      quantity: number;
      scannedQuantity?: number;
      status?: any;
    }>,
  ): Promise<void> {
    const shipment = await this.shipmentRepository.findOne({
      where: { id: shipmentId },
    });

    if (!shipment) {
      throw new NotFoundException(`Shipment with ID ${shipmentId} not found`);
    }

    for (const itemDto of items) {
      const article = await this.articleRepository.findOne({
        where: { id: itemDto.articleId },
      });

      if (!article) {
        throw new NotFoundException(
          `Article with ID ${itemDto.articleId} not found`,
        );
      }

      const shipmentItem = this.shipmentItemRepository.create({
        quantity: itemDto.quantity,
        scannedQuantity: itemDto.scannedQuantity || 0,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        status: itemDto.status,
        shipment,
        article,
      });

      await this.shipmentItemRepository.save(shipmentItem);
    }

    await this.recalculateShipmentTotals(shipmentId);
  }

  async findAll(
    paginationQuery: PaginationQueryDto,
  ): Promise<PaginatedResponseDto<ShipmentResponseDto>> {
    const { page = 1, limit = 10, search, status } = paginationQuery;
    const skip = (page - 1) * limit;

    const queryBuilder = this.shipmentRepository
      .createQueryBuilder('shipment')
      .leftJoinAndSelect('shipment.items', 'items')
      .leftJoinAndSelect('items.article', 'article');

    if (search) {
      const searchTerm = `%${search}%`;
      queryBuilder.where(
        '(CAST(shipment.id AS TEXT) ILIKE :search OR ' +
          'shipment.shipmentNumber ILIKE :search)',
        { search: searchTerm },
      );
    }

    if (status) {
      if (search) {
        queryBuilder.andWhere('shipment.status = :status', { status });
      } else {
        queryBuilder.where('shipment.status = :status', { status });
      }
    }

    queryBuilder.orderBy('shipment.id', 'DESC').skip(skip).take(limit);

    const [data, total] = await queryBuilder.getManyAndCount();

    const totalPages = Math.ceil(total / limit);

    const mappedData = data.map((shipment) => ({
      ...shipment,
      progress: shipment.progress,
    }));

    return {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      data: mappedData as any,
      meta: {
        total,
        page,
        limit,
        totalPages,
        hasNextPage: page < totalPages,
        hasPreviousPage: page > 1,
      },
    };
  }

  async findOne(id: number): Promise<Shipment | null> {
    const shipment = await this.shipmentRepository.findOne({
      where: { id },
      relations: ['items', 'items.article'],
    });

    if (!shipment) {
      return null;
    }

    return shipment;
  }

  async update(
    id: number,
    updateShipmentDto: UpdateShipmentDto,
  ): Promise<Shipment | null> {
    const shipment = await this.shipmentRepository.findOne({
      where: { id },
    });

    if (!shipment) {
      return null;
    }

    Object.assign(shipment, {
      status: updateShipmentDto.status,
    });

    await this.shipmentRepository.save(shipment);

    if (updateShipmentDto.items && updateShipmentDto.items.length > 0) {
      await this.shipmentItemRepository.delete({ shipment: { id } });
      await this.addItemsToShipment(id, updateShipmentDto.items);
    }

    return this.findOne(id);
  }

  async updateShipmentItem(
    shipmentId: number,
    itemId: number,
    updateDto: UpdateShipmentItemDto,
  ): Promise<ShipmentItem | null> {
    const shipmentItem = await this.shipmentItemRepository.findOne({
      where: { id: itemId, shipment: { id: shipmentId } },
      relations: ['article'],
    });

    if (!shipmentItem) {
      return null;
    }

    Object.assign(shipmentItem, updateDto);

    await this.shipmentItemRepository.save(shipmentItem);
    await this.recalculateShipmentTotals(shipmentId);

    return shipmentItem;
  }

  async delete(id: number): Promise<void> {
    const shipment = await this.shipmentRepository.findOne({
      where: { id },
      relations: ['items'],
    });

    if (shipment) {
      // Delete items first manually
      if (shipment.items && shipment.items.length > 0) {
        await this.shipmentItemRepository.remove(shipment.items);
      }
      // Then delete the shipment
      await this.shipmentRepository.remove(shipment);
    }
  }

  async scanArticle(barcode: string): Promise<ShipmentItem | null> {
    const article = await this.articleRepository.findOne({
      where: { barcode },
    });

    if (!article) {
      return null;
    }

    const shipmentItem = await this.shipmentItemRepository
      .createQueryBuilder('item')
      .innerJoinAndSelect('item.shipment', 'shipment')
      .innerJoinAndSelect('item.article', 'article')
      .where('article.id = :articleId', { articleId: article.id })
      .andWhere('item.scannedQuantity < item.quantity')
      .andWhere('shipment.status != :completedStatus', {
        completedStatus: ShipmentStatus.COMPLETED,
      })
      .orderBy('shipment.createdAt', 'ASC')
      .getOne();

    if (!shipmentItem) {
      return null;
    }

    shipmentItem.scannedQuantity += 1;

    await this.shipmentItemRepository.save(shipmentItem);
    await this.recalculateShipmentTotals(shipmentItem.shipment.id);

    return this.shipmentItemRepository.findOne({
      where: { id: shipmentItem.id },
      relations: ['article', 'shipment'],
    });
  }

  async recalculateShipmentTotals(shipmentId: number): Promise<void> {
    const shipment = await this.shipmentRepository.findOne({
      where: { id: shipmentId },
      relations: ['items'],
    });

    if (!shipment) {
      return;
    }

    const differentArticles = shipment.items.length;
    const totalArticles = shipment.items.reduce(
      (sum, item) => sum + item.quantity,
      0,
    );
    const scannedArticles = shipment.items.reduce(
      (sum, item) => sum + item.scannedQuantity,
      0,
    );

    shipment.differentArticles = differentArticles;
    shipment.totalArticles = totalArticles;
    shipment.scannedArticles = scannedArticles;

    if (scannedArticles === 0) {
      shipment.status = ShipmentStatus.DRAFT;
    } else if (scannedArticles < totalArticles) {
      shipment.status = ShipmentStatus.IN_PROGRESS;
    } else if (scannedArticles >= totalArticles) {
      shipment.status = ShipmentStatus.COMPLETED;
    }

    await this.shipmentRepository.save(shipment);
  }
}
