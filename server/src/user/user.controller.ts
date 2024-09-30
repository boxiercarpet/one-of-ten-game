import { Controller, Get } from '@nestjs/common';
import { UserService } from './user.service';
import { GetUser } from 'src/auth/decorator/user.decorator';

@Controller('users')
export class UserController {
    constructor(private userService: UserService) {}

    @Get('@me')
    async me(@GetUser() user: any) {
        return user;
    }
}
