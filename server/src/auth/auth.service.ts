import { Injectable, MethodNotAllowedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService,
    ) {}

    async validateUser(username: string, password: string) {
        const user = await this.userService.user({ username });
        if (user && bcrypt.compareSync(password, user.password)) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }

    async login(user: any) {
        const payload = { username: user.username, sub: user.id };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }

    async register(username: string, password: string) {
        const hash = bcrypt.hashSync(password, 10);
        try {
            const user = await this.userService.createUser({
                username: username,
                password: hash,
            });
            return this.login(user);
        } catch (error) {
            if (error.code === 'P2002') {
                throw new MethodNotAllowedException('Username already exists');
            }
            throw error;
        }
    }
}
