import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateArticleDto {
  @ApiProperty({
    example: 'ART-001',
    description: 'Unique article identifier',
  })
  @IsString()
  @IsNotEmpty()
  article_id: string;

  @ApiProperty({
    example: '1234567890123',
    description: 'Article barcode',
  })
  @IsString()
  @IsNotEmpty()
  barcode: string;

  @ApiProperty({
    example: 'Widget A',
    description: 'Article name (unique)',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiPropertyOptional({
    example: 'Acme Corp',
    description: 'Article manufacturer',
  })
  @IsString()
  @IsOptional()
  manufacturer?: string;

  @ApiPropertyOptional({
    example: 'Electronics',
    description: 'Article category',
  })
  @IsString()
  @IsOptional()
  category?: string;

  @ApiProperty({
    example: 29.99,
    description: 'Article price',
  })
  @IsNumber()
  @Min(0)
  price: number;

  @ApiProperty({
    example: 0,
    description: 'Number of times scanned',
  })
  @IsNumber()
  @Min(0)
  scanned: number;
}
