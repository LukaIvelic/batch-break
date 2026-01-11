import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    example: 'john@example.com',
    description: 'User email address',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: 'John', description: 'User first name' })
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({ example: 'Doe', description: 'User last name' })
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @ApiProperty({
    example: 'password123',
    description: 'User password (min 6 characters)',
  })
  @IsString()
  @MinLength(6)
  password: string;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}

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

export class UserValidationResponseDto {
  @ApiProperty({
    example: 'john@example.com',
    description: 'User email address',
  })
  email: string;

  @ApiProperty({ example: 'True', description: 'User is in the database' })
  isInDatabase: boolean;
}
