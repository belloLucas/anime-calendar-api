import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { RecoverPasswordDto, RegisterDto } from 'src/users/dto/users.dto';
import { compare, hash } from 'bcrypt';
import { Role, Users } from 'src/generated/prisma/client';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(userDto: RegisterDto): Promise<Omit<Users, 'password'>> {
    const existingUser = await this.prisma.users.findFirst({
      where: {
        OR: [{ email: userDto.email }, { username: userDto.username }],
      },
    });

    if (existingUser) {
      throw new HttpException('user_already_exists', HttpStatus.CONFLICT);
    }

    const hashedPassword = await hash(userDto.password, 10);

    return await this.prisma.users.create({
      data: {
        email: userDto.email,
        username: userDto.username,
        password: hashedPassword,
        role: userDto.role ?? Role.USER,
      },
      select: {
        id: true,
        email: true,
        username: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  async findByEmail(email: string): Promise<Users | null> {
    return await this.prisma.users.findUnique({
      where: { email },
    });
  }

  async findById(id: string): Promise<Omit<Users, 'password'> | null> {
    return await this.prisma.users.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        username: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  findByPayload(payload: {
    sub: string;
  }): Promise<Omit<Users, 'password'> | null> {
    return this.findById(payload.sub);
  }

  async updatePassword(
    payload: RecoverPasswordDto,
    userId: string,
  ): Promise<Omit<Users, 'password'>> {
    const user = await this.prisma.users.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new HttpException('invalid_credentials', HttpStatus.UNAUTHORIZED);
    }

    const areEqual = await compare(payload.oldPassword, user.password);

    if (!areEqual) {
      throw new HttpException('invalid_credentials', HttpStatus.UNAUTHORIZED);
    }

    return await this.prisma.users.update({
      where: { id: userId },
      data: { password: await hash(payload.newPassword, 10) },
      select: {
        id: true,
        email: true,
        username: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }
}
