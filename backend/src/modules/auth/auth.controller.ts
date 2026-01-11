import { Controller, Post, Body } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { ApiLogin } from "./auth.decorators";
import { LoginDto } from "./dto/LoginDto";

@Controller("auth")
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @ApiLogin()
    @Post("login")
    async login(@Body() loginDto: LoginDto) {
        console.log('Login attempt for email:', loginDto.email);
        return this.authService.login(loginDto.email, loginDto.password);
    }
}