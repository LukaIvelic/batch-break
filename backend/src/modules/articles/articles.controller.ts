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
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ArticlesService } from './articles.service';
import { ArticleResponseDto } from './dto/ArticleResponseDto';
import { CreateArticleDto } from './dto/CreateArticleDto';
import { UpdateArticleDto } from './dto/UpdateArticleDto';
import { BulkCreateArticlesDto } from './dto/BulkCreateArticlesDto';
import { PaginationQueryDto } from './dto/PaginationQueryDto';
import { PaginatedResponseDto } from './dto/PaginatedResponseDto';
import * as Dec from './articles.decorators';

@ApiTags('articles')
@Controller('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @Post()
  @Dec.ApiArticleCreate()
  create(
    @Body() createArticleDto: CreateArticleDto,
  ): Promise<ArticleResponseDto> {
    return this.articlesService.create(createArticleDto);
  }

  @Post('bulk')
  @Dec.ApiArticleBulkCreate()
  createBulk(
    @Body() bulkCreateDto: BulkCreateArticlesDto,
  ): Promise<ArticleResponseDto[]> {
    return this.articlesService.createBulk(bulkCreateDto.articles);
  }

  @Get()
  @Dec.ApiArticleFindAll()
  findAll(
    @Query() paginationQuery: PaginationQueryDto,
  ): Promise<PaginatedResponseDto<ArticleResponseDto>> {
    return this.articlesService.findAll(paginationQuery);
  }

  @Get(':id')
  @Dec.ApiArticleFindOne()
  findOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ArticleResponseDto | null> {
    return this.articlesService.findOne(id);
  }

  @Patch(':id')
  @Dec.ApiArticleUpdate()
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateArticleDto: UpdateArticleDto,
  ): Promise<ArticleResponseDto | null> {
    return this.articlesService.update(id, updateArticleDto);
  }

  @Delete(':id')
  @Dec.ApiArticleDelete()
  delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.articlesService.delete(id);
  }
}
