import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { ArrayMinSize, IsArray, ValidateNested } from 'class-validator';
import { CreateArticleDto } from './CreateArticleDto';

export class BulkCreateArticlesDto {
  @ApiProperty({
    type: [CreateArticleDto],
    description: 'Array of articles to create',
  })
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => CreateArticleDto)
  articles: CreateArticleDto[];
}
