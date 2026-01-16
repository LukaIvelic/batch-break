import { applyDecorators, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiParam, ApiQuery } from '@nestjs/swagger';
import { ArticleResponseDto } from './dto/ArticleResponseDto';

export function ApiArticleCreate() {
  return applyDecorators(
    ApiOperation({ summary: 'Create a new article' }),
    ApiResponse({
      status: 201,
      description: 'Article created successfully',
      type: ArticleResponseDto,
    }),
    ApiResponse({
      status: 400,
      description: 'Bad request - validation failed',
    }),
    ApiResponse({
      status: 409,
      description: 'Conflict - article name already exists',
    }),
  );
}

export function ApiArticleFindAll() {
  return applyDecorators(
    ApiOperation({ summary: 'Get paginated list of articles' }),
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
      description: 'Search term to filter articles',
    }),
    ApiResponse({ status: 200, description: 'Paginated list of articles' }),
  );
}

export function ApiArticleFindOne() {
  return applyDecorators(
    ApiOperation({ summary: 'Get an article by ID' }),
    ApiParam({ name: 'id', description: 'Article ID' }),
    ApiResponse({
      status: 200,
      description: 'Article found',
      type: ArticleResponseDto,
    }),
    ApiResponse({ status: 404, description: 'Article not found' }),
  );
}

export function ApiArticleUpdate() {
  return applyDecorators(
    ApiOperation({ summary: 'Update an article' }),
    ApiParam({ name: 'id', description: 'Article ID' }),
    ApiResponse({
      status: 200,
      description: 'Article updated successfully',
      type: ArticleResponseDto,
    }),
    ApiResponse({ status: 400, description: 'Bad request' }),
    ApiResponse({ status: 404, description: 'Article not found' }),
    ApiResponse({
      status: 409,
      description: 'Conflict - article name already exists',
    }),
  );
}

export function ApiArticleDelete() {
  return applyDecorators(
    HttpCode(HttpStatus.NO_CONTENT),
    ApiOperation({ summary: 'Delete an article' }),
    ApiParam({ name: 'id', description: 'Article ID' }),
    ApiResponse({ status: 204, description: 'Article deleted successfully' }),
    ApiResponse({ status: 404, description: 'Article not found' }),
  );
}

export function ApiArticleBulkCreate() {
  return applyDecorators(
    ApiOperation({ summary: 'Create multiple articles' }),
    ApiResponse({
      status: 201,
      description: 'Articles created successfully',
      type: [ArticleResponseDto],
    }),
    ApiResponse({
      status: 400,
      description: 'Bad request - validation failed',
    }),
    ApiResponse({
      status: 409,
      description: 'Conflict - one or more article names already exist',
    }),
  );
}
