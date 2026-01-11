import { applyDecorators, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiResponse } from '@nestjs/swagger';

export function ApiLogin() {
  return applyDecorators(
    ApiOperation({ summary: 'Login with credentials' }),
    ApiQuery({ name: 'email', required: true }),
    ApiQuery({ name: 'password', required: true }),
    ApiResponse({
      status: HttpStatus.OK,
      description: 'Authentication successful',
      type: Boolean,
    }),
    ApiResponse({
      status: HttpStatus.FORBIDDEN,
      description: 'Authentication failed',
    }),
    ApiResponse({
      status: HttpStatus.NOT_FOUND,
      description: 'User not found',
    }),
  );
}

export function ApiSignup() {
  return applyDecorators(
    ApiOperation({ summary: 'Signup with credentials' }),
    ApiQuery({ name: 'email', required: true }),
    ApiQuery({ name: 'password', required: true }),
    ApiQuery({ name: 'confirmPassword', required: true }),
    ApiQuery({ name: 'firstName', required: true }),
    ApiQuery({ name: 'lastName', required: true }),
    ApiResponse({
      status: HttpStatus.OK,
      description: 'Signup successful',
      type: Boolean,
    }),
    ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Signup failed' }),
  );
}
