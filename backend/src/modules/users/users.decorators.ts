import { applyDecorators, HttpCode, HttpStatus, ParseUUIDPipe } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiParam, ApiQuery } from '@nestjs/swagger';
import { UserResponseDto } from './dto/UserResponseDto';

export const UUIDPipe = new ParseUUIDPipe({ version: '4' });

export function ApiUserCreate() {
  return applyDecorators(
    ApiOperation({ summary: 'Create a new user' }),
    ApiResponse({ status: 201, description: 'User created successfully', type: UserResponseDto }),
    ApiResponse({ status: 400, description: 'Bad request - validation failed' }),
    ApiResponse({ status: 409, description: 'Conflict - email already exists' }),
  );
}

export function ApiUserFindAll() {
  return applyDecorators(
    ApiOperation({ summary: 'Get all users or filter by email' }),
    ApiQuery({ name: 'email', required: false, description: 'Filter by email address' }),
    ApiResponse({ status: 200, description: 'List of users or single user', type: [UserResponseDto] }),
  );
}

export function ApiUserValidate() {
  return applyDecorators(
    ApiOperation({ summary: 'Validate user credentials' }),
    ApiQuery({ name: 'email', required: true }),
    ApiQuery({ name: 'password', required: true }),
    ApiResponse({ status: 200, description: 'User validated successfully', type: Boolean }),
    ApiResponse({ status: 404, description: 'User not found' }),
  );
}

export function ApiUserFindByEmail() {
  return applyDecorators(
    ApiOperation({ summary: 'Get a user by email' }),
    ApiQuery({ name: 'email', description: 'User email' }),
    ApiResponse({ status: 200, type: UserResponseDto }),
  );
}

export function ApiUserExists() {
  return applyDecorators(
    ApiOperation({ summary: 'Check if a user exists by email' }),
    ApiQuery({ name: 'email', required: true, description: 'User email' }),
    ApiResponse({ status: 200, description: 'User existence status', schema: { properties: { exists: { type: 'boolean' } } } }),
  );
}

export function ApiUserFindOne() {
  return applyDecorators(
    ApiOperation({ summary: 'Get a user by ID' }),
    ApiParam({ name: 'id', description: 'User ID' }),
    ApiResponse({ status: 200, description: 'User found', type: UserResponseDto }),
    ApiResponse({ status: 404, description: 'User not found' }),
  );
}

export function ApiUserUpdate() {
  return applyDecorators(
    ApiOperation({ summary: 'Update a user' }),
    ApiParam({ name: 'id', description: 'User ID' }),
    ApiResponse({ status: 200, description: 'User updated successfully', type: UserResponseDto }),
    ApiResponse({ status: 400, description: 'Bad request' }),
    ApiResponse({ status: 404, description: 'User not found' }),
    ApiResponse({ status: 409, description: 'Conflict - email already exists' }),
  );
}

export function ApiUserDelete() {
  return applyDecorators(
    HttpCode(HttpStatus.NO_CONTENT),
    ApiOperation({ summary: 'Delete a user' }),
    ApiParam({ name: 'id', description: 'User ID' }),
    ApiResponse({ status: 204, description: 'User deleted successfully' }),
    ApiResponse({ status: 404, description: 'User not found' }),
  );
}