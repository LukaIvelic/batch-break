import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { UserResponseDto } from './dto/UserResponseDto';
import { CreateUserDto } from './dto/CreateUserDto';
import { UpdateUserDto } from './dto/UpdateUserDto';
import * as Dec from './users.decorators';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(1)
  @ApiBearerAuth()
  @Dec.ApiUserCreate()
  create(@Body() createUserDto: CreateUserDto): Promise<UserResponseDto> {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Dec.ApiUserFindAll()
  findAll(
    @Query('email') email?: string,
  ): Promise<UserResponseDto | UserResponseDto[] | null> {
    if (email) {
      return this.usersService.findOneByEmail(email);
    }
    return this.usersService.findAll();
  }

  @Get('exists')
  @Dec.ApiUserExists()
  exists(@Query('email') email: string): Promise<{ exists: boolean }> {
    console.log('Controller checking database for email:', email);
    return this.usersService.exists(email);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Dec.ApiUserFindOne()
  findOne(@Param('id', Dec.UUIDPipe) id: string): Promise<UserResponseDto> {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(1, 3)
  @ApiBearerAuth()
  @Dec.ApiUserUpdate()
  update(
    @Param('id', Dec.UUIDPipe) id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UserResponseDto> {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(1, 3)
  @ApiBearerAuth()
  @Dec.ApiUserDelete()
  remove(@Param('id', Dec.UUIDPipe) id: string): Promise<void> {
    return this.usersService.remove(id);
  }
}
