import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Article } from './entities/article.entity';
import { CreateArticleDto } from './dto/CreateArticleDto';
import { UpdateArticleDto } from './dto/UpdateArticleDto';
import { PaginationQueryDto } from './dto/PaginationQueryDto';
import { PaginatedResponseDto } from './dto/PaginatedResponseDto';

@Injectable()
export class ArticlesService {
  constructor(
    @InjectRepository(Article)
    private readonly articleRepository: Repository<Article>,
  ) {}

  async create(createArticleDto: CreateArticleDto): Promise<Article> {
    const article = this.articleRepository.create(createArticleDto);
    return this.articleRepository.save(article);
  }

  async createBulk(createArticleDtos: CreateArticleDto[]): Promise<Article[]> {
    const articles = this.articleRepository.create(createArticleDtos);
    return this.articleRepository.save(articles);
  }

  async findAll(
    paginationQuery: PaginationQueryDto,
  ): Promise<PaginatedResponseDto<Article>> {
    const { page = 1, limit = 10, search } = paginationQuery;
    const skip = (page - 1) * limit;

    const queryBuilder = this.articleRepository.createQueryBuilder('article');

    if (search) {
      const searchTerm = `%${search}%`;
      queryBuilder.where(
        '(CAST(article.id AS TEXT) ILIKE :search OR ' +
          'article.article_id ILIKE :search OR ' +
          'article.barcode ILIKE :search OR ' +
          'article.name ILIKE :search OR ' +
          'article.manufacturer ILIKE :search OR ' +
          'article.category ILIKE :search OR ' +
          'CAST(article.price AS TEXT) ILIKE :search)',
        { search: searchTerm },
      );
    }

    queryBuilder.orderBy('article.id', 'ASC').skip(skip).take(limit);

    const [data, total] = await queryBuilder.getManyAndCount();

    const totalPages = Math.ceil(total / limit);

    return {
      data,
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

  async findOne(id: number): Promise<Article | null> {
    return this.articleRepository.findOne({ where: { id } });
  }

  async update(
    id: number,
    updateArticleDto: UpdateArticleDto,
  ): Promise<Article | null> {
    const article = await this.articleRepository.findOne({ where: { id } });
    if (!article) {
      return null;
    }
    Object.assign(article, updateArticleDto);
    return this.articleRepository.save(article);
  }

  async delete(id: number): Promise<void> {
    await this.articleRepository.delete(id);
  }
}
