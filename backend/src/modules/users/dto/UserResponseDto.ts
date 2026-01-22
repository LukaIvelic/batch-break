import { ApiProperty } from '@nestjs/swagger';

export class UserResponseDto {
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

  @ApiProperty({ example: 'John', description: 'User first name' })
  firstName: string;

  @ApiProperty({ example: 'Doe', description: 'User last name' })
  lastName: string;

  @ApiProperty({ example: 1, description: 'User role ID' })
  roleId: number;

  @ApiProperty({
    example: '2026-01-10T00:00:00.000Z',
    description: 'Creation timestamp',
  })
  createdAt: Date;

  @ApiProperty({
    example: '2026-01-10T00:00:00.000Z',
    description: 'Last update timestamp',
  })
  updatedAt: Date;
}
