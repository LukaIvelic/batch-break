import { ApiProperty } from '@nestjs/swagger';
import { Role } from 'src/modules/roles/entities/role.entity';

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

  @ApiProperty({ description: 'User role' })
  role: Role;
}
