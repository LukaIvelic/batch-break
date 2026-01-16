import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class ArticleResponseDto {
  @ApiProperty({
    example: 1,
    description: 'Article unique identifier',
  })
  id: number;

  @ApiProperty({
    example: 'ART-001',
    description: 'Unique article identifier',
  })
  article_id: string;

  @ApiProperty({
    example: '1234567890123',
    description: 'Article barcode',
  })
  barcode: string;

  @ApiProperty({
    example: 'Widget A',
    description: 'Article name',
  })
  name: string;

  @ApiPropertyOptional({
    example: 'Acme Corp',
    description: 'Article manufacturer',
  })
  manufacturer?: string;

  @ApiPropertyOptional({
    example: 'Electronics',
    description: 'Article category',
  })
  category?: string;

  @ApiProperty({
    example: 29.99,
    description: 'Article price',
  })
  price: number;

  @ApiProperty({
    example: 5,
    description: 'Number of times scanned',
  })
  scanned: number;

  @ApiProperty({
    example: '2026-01-10T00:00:00.000Z',
    description: 'Creation timestamp',
  })
  createdAt: Date;

  @ApiProperty({
    example: '2026-01-10T00:00:00.000Z',
    description: 'Last update timestamp',
  })
  updatedAt: Date;
}
