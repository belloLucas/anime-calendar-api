/* eslint-disable @typescript-eslint/no-unsafe-call */
import {
  IsString,
  IsOptional,
  IsInt,
  IsBoolean,
  IsEnum,
  IsArray,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ReleaseDay } from 'src/generated/prisma/client';

export class CreateAnimeDto {
  @ApiProperty({
    description: 'Título do anime',
    example: 'Jujutsu Kaisen: Shimetsu Kaiyuu - Zenpen',
  })
  @IsString()
  title: string;

  @ApiPropertyOptional({
    description: 'Slug do anime (URL amigável)',
    example: 'jujutsu-kaisen-shimetsu-kaiyuu-zenpen',
  })
  @IsOptional()
  @IsString()
  slug?: string;

  @ApiPropertyOptional({
    description: 'URL da imagem de capa',
    example: 'https://cdn.myanimelist.net/images/anime/1659/154920.jpg',
  })
  @IsOptional()
  @IsString()
  cover_url?: string;

  @ApiPropertyOptional({
    description: 'Lista de gêneros do anime',
    example: ['Action', 'Supernatural', 'School', 'Shounen'],
    type: [String],
  })
  @IsOptional()
  @IsArray()
  genres?: string[];

  @ApiPropertyOptional({
    description: 'Ano de lançamento',
    example: 2026,
  })
  @IsOptional()
  @IsInt()
  release_year?: number;

  @ApiPropertyOptional({
    description: 'Dia da semana de lançamento',
    enum: ReleaseDay,
    example: 'FRIDAYS',
  })
  @IsOptional()
  @IsEnum(ReleaseDay)
  release_day?: ReleaseDay;

  @ApiPropertyOptional({
    description: 'Se o anime é recomendado',
    example: true,
    default: false,
  })
  @IsOptional()
  @IsBoolean()
  is_recommended?: boolean;
}
