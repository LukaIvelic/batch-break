import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiLogin, ApiSignup } from './auth.decorators';
import { LoginDto } from './dto/LoginDto';
import { SignupDto } from './dto/SignupDto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiLogin()
  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    console.log('Login attempt for email:', loginDto.email);
    return this.authService.login(loginDto.email, loginDto.password);
  }

  @ApiSignup()
  @Post('signup')
  async signup(@Body() signupDto: SignupDto) {
    console.log('Signup attempt for email:', signupDto.email);
    return this.authService.signup(
      signupDto.email,
      signupDto.password,
      signupDto.confirmPassword,
      signupDto.firstName,
      signupDto.lastName,
    );
  }
}
