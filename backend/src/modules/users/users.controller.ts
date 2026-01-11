import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { UserResponseDto } from './dto/UserResponseDto';
import { CreateUserDto } from './dto/CreateUserDto';
import { UpdateUserDto } from './dto/UpdateUserDto';
import * as Dec from './users.decorators';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @Dec.ApiUserCreate()
  create(@Body() createUserDto: CreateUserDto): Promise<UserResponseDto> {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @Dec.ApiUserFindAll()
  findAll(@Query('email') email?: string): Promise<UserResponseDto | UserResponseDto[] | null> {
    if (email) {
      return this.usersService.findOneByEmail(email);
    }
    return this.usersService.findAll();
  }

  @Get('exists')
  @Dec.ApiUserExists()
  exists(@Query('email') email: string): Promise<{ exists: boolean }> {
    console.log("Controller checking database for email:", email);
    return this.usersService.exists(email);
  }

  @Get(':id')
  @Dec.ApiUserFindOne()
  findOne(@Param('id', Dec.UUIDPipe) id: string): Promise<UserResponseDto> {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  @Dec.ApiUserUpdate()
  update(
    @Param('id', Dec.UUIDPipe) id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UserResponseDto> {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  @Dec.ApiUserDelete()
  remove(@Param('id', Dec.UUIDPipe) id: string): Promise<void> {
    return this.usersService.remove(id);
  }
}