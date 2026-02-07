/* eslint-disable @typescript-eslint/no-unsafe-call */
import {
  IsString,
  IsOptional,
  IsInt,
  IsBoolean,
  IsEnum,
  IsArray,
} from 'class-validator';
import { ReleaseDay } from 'src/generated/prisma/client';
import { PartialType } from '@nestjs/swagger';
import { CreateAnimeDto } from './create-anime.dto';

export class UpdateAnimeDto extends PartialType(CreateAnimeDto) {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  slug?: string;

  @IsOptional()
  @IsString()
  cover_url?: string;

  @IsOptional()
  @IsArray()
  genres?: string[];

  @IsOptional()
  @IsInt()
  release_year?: number;

  @IsOptional()
  @IsEnum(ReleaseDay)
  release_day?: ReleaseDay;

  @IsOptional()
  @IsBoolean()
  is_recommended?: boolean;
}
