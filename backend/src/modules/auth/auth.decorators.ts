import { applyDecorators, HttpStatus } from "@nestjs/common";
import { ApiOperation, ApiQuery, ApiResponse } from "@nestjs/swagger";

export function ApiLogin() {
  return applyDecorators(
    ApiOperation({ summary: 'Login with credentials' }),
    ApiQuery({ name: 'email', required: true }),
    ApiQuery({ name: 'password', required: true }),
    ApiResponse({ status: HttpStatus.OK, description: 'Authentication successful', type: Boolean }),
    ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Authentication failed' }),
    ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'User not found' }),
  );
}