import {
  IsEmail,
  IsString,
  MinLength,
  IsOptional,
  IsNotEmpty,
  IsEnum,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Role } from 'src/generated/prisma/client';

export class RegisterDto {
  @ApiProperty({ example: 'user@example.com' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: 'senha123', minLength: 8 })
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  password: string;

  @ApiProperty({ example: 'joaosilva' })
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiPropertyOptional({ example: 'USER', enum: Role })
  @IsOptional()
  @IsEnum(Role)
  role?: Role;
}

export class LoginDto {
  @ApiProperty({ example: 'user@example.com' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: 'senha123' })
  @IsString()
  @IsNotEmpty()
  password: string;
}

export class RecoverPasswordDto {
  @ApiProperty({ example: 'senha123' })
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  oldPassword: string;

  @ApiProperty({ example: 'senha321' })
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  newPassword: string;
}
