import { CreateArticleDto } from './CreateArticleDto';
import { PartialType } from '@nestjs/swagger';

export class UpdateArticleDto extends PartialType(CreateArticleDto) {}
