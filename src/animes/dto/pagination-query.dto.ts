import {
  IsOptional,
  IsInt,
  Min,
  Max,
  IsEnum,
  IsBoolean,
} from 'class-validator';
import { Type, Transform } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { ReleaseDay } from 'src/generated/prisma/client';

export enum SortOrder {
  ASC = 'asc',
  DESC = 'desc',
}

export enum SortField {
  ID = 'id',
  TITLE = 'title',
  RELEASE_YEAR = 'release_year',
  CREATED_AT = 'createdAt',
  UPDATED_AT = 'updatedAt',
}

export class PaginationQueryDto {
  @ApiPropertyOptional({
    description: 'Número da página',
    minimum: 1,
    default: 1,
    example: 1,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number = 1;

  @ApiPropertyOptional({
    description: 'Quantidade de itens por página',
    minimum: 1,
    maximum: 100,
    default: 5,
    example: 10,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(100)
  limit?: number = 5;

  @ApiPropertyOptional({
    description: 'Campo para ordenação',
    enum: SortField,
    default: SortField.CREATED_AT,
    example: SortField.ID,
  })
  @IsOptional()
  @IsEnum(SortField)
  sortBy?: SortField = SortField.CREATED_AT;

  @ApiPropertyOptional({
    description: 'Ordem de classificação',
    enum: SortOrder,
    default: SortOrder.DESC,
    example: SortOrder.ASC,
  })
  @IsOptional()
  @IsEnum(SortOrder)
  order?: SortOrder = SortOrder.DESC;

  @ApiPropertyOptional({
    description: 'Filtrar por dia da semana de lançamento',
    enum: ReleaseDay,
    example: 'MONDAYS',
  })
  @IsOptional()
  @Transform(({ value }) => value?.toUpperCase())
  @IsEnum(ReleaseDay)
  day?: ReleaseDay;

  @ApiPropertyOptional({
    description: 'Filtrar por ano de lançamento',
    example: 2026,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  year?: number;

  @ApiPropertyOptional({
    description: 'Filtrar apenas animes recomendados',
    example: true,
  })
  @IsOptional()
  @Transform(({ value }) => value === 'true' || value === true)
  @IsBoolean()
  recommended?: boolean;

  @ApiPropertyOptional({
    description: 'Buscar por título (case-insensitive)',
    example: 'jujutsu',
  })
  @IsOptional()
  search?: string;
}
