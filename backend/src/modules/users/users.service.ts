import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/CreateUserDto';
import { UserResponseDto } from './dto/UserResponseDto';
import { UpdateUserDto } from './dto/UpdateUserDto';
import { GetUserCredentialsResponse } from './dto/GetUserCredentialsResponse';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<UserResponseDto> {
    const { email, firstName, lastName, password } = createUserDto;

    const existingUser = await this.usersRepository.findOne({
      where: { email },
    });

    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = this.usersRepository.create({
      email,
      firstName,
      lastName,
      role: { id: 4 },
      password: hashedPassword,
    });

    const savedUser = await this.usersRepository.save(user);
    return this.mapToUserResponse(savedUser);
  }

  async findAll(): Promise<UserResponseDto[]> {
    const users = await this.usersRepository.find({ relations: ['role'] });
    return users.map((user) => this.mapToUserResponse(user));
  }

  async findOne(id: string): Promise<UserResponseDto> {
    const user = await this.usersRepository.findOne({
      where: { id },
      relations: ['role'],
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return this.mapToUserResponse(user);
  }

  async findOneByEmail(email: string): Promise<UserResponseDto | null> {
    const user = await this.usersRepository.findOne({
      where: { email },
      relations: ['role'],
    });

    if (!user) {
      return null;
    }

    return this.mapToUserResponse(user);
  }

  async exists(email: string): Promise<{ exists: boolean }> {
    const user = await this.usersRepository.findOne({ where: { email } });
    return { exists: !!user };
  }

  async getCredentialsByEmail(
    email: string,
  ): Promise<GetUserCredentialsResponse | null> {
    const user = await this.usersRepository.findOne({
      where: { email },
      relations: ['role'],
    });

    if (!user) {
      return null;
    }

    return user;
  }

  async update(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<UserResponseDto> {
    const user = await this.usersRepository.findOne({
      where: { id },
      relations: ['role'],
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    if (updateUserDto.email && updateUserDto.email !== user.email) {
      const existingUser = await this.usersRepository.findOne({
        where: { email: updateUserDto.email },
      });
      if (existingUser) {
        throw new ConflictException('Email is already in use');
      }
      user.email = updateUserDto.email;
    }

    if (updateUserDto.firstName) {
      user.firstName = updateUserDto.firstName;
    }

    if (updateUserDto.lastName) {
      user.lastName = updateUserDto.lastName;
    }

    if (updateUserDto.password) {
      user.password = await bcrypt.hash(updateUserDto.password, 10);
    }

    const savedUser = await this.usersRepository.save(user);
    return this.mapToUserResponse(savedUser);
  }

  async remove(id: string): Promise<void> {
    const result = await this.usersRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
  }

  private mapToUserResponse(user: User): UserResponseDto {
    return {
      id: user.id,
      roleId: user.role?.id ?? null,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }
}
