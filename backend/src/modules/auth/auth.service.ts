import {
  Injectable,
  NotFoundException,
  ForbiddenException,
  InternalServerErrorException,
  ConflictException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async login(email: string, password: string) {
    const user = await this.usersService.getCredentialsByEmail(email);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      throw new ForbiddenException('Authentication failed');
    }

    const payload = {
      userId: user.id,
      email: user.email,
      roleId: user.role?.id ?? null,
    };
    const accessToken = this.jwtService.sign(payload);

    return {
      access_token: accessToken,
    };
  }

  async signup(
    email: string,
    password: string,
    confirmPassword: string,
    firstName: string,
    lastName: string,
  ) {
    if (password !== confirmPassword) {
      throw new InternalServerErrorException('Signup failed');
    }

    const userExists = await this.usersService.getCredentialsByEmail(email);
    if (userExists) {
      throw new ConflictException('Signup failed');
    }

    const newUser = await this.usersService.create({
      email,
      password,
      firstName,
      lastName,
    });

    if (!newUser) throw new InternalServerErrorException('Signup failed');

    const payload = {
      userId: newUser.id,
      email: newUser.email,
      roleId: newUser.roleId,
    };
    const accessToken = this.jwtService.sign(payload);

    return {
      access_token: accessToken,
    };
  }
}
