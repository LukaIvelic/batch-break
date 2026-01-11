import { Injectable, NotFoundException, ForbiddenException } from "@nestjs/common";
import * as bcrypt from 'bcrypt';
import { UsersService } from "../users/users.service";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService
    ) {}

    async login(email: string, password: string) {
        const user = await this.usersService.getCredentialsByEmail(email);

        if (!user) {
            throw new NotFoundException("User not found");
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        
        if (!isPasswordCorrect) {
            throw new ForbiddenException("Authentication failed");
        }

        const payload = { userId: user.id, email: user.email };
        const accessToken = this.jwtService.sign(payload);

        return {
            access_token: accessToken
        };
    }
}