import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
    constructor(private prisma: PrismaService) {}

    async user(where: Prisma.UserWhereUniqueInput) {
        return this.prisma.user.findUnique({
            where,
        });
    }

    async createUser(data: Prisma.UserCreateInput) {
        return this.prisma.user.create({
            data,
        });
    }

    async updateUser(id: string, data: Prisma.UserUpdateInput) {
        return this.prisma.user.update({
            where: {
                id,
            },
            data,
        });
    }

    async deleteUser(id: string) {
        return this.prisma.user.delete({
            where: {
                id,
            },
        });
    }
}
