import { ApiProperty } from '@nestjs/swagger';

export class GetUserCredentialsResponse {
  @ApiProperty({
    example: 'uuid-string',
    description: 'User unique identifier',
  })
  id: string;

  @ApiProperty({
    example: 'john@example.com',
    description: 'User email address',
  })
  email: string;

  @ApiProperty({ example: 'password123', description: 'User password' })
  password: string;
}