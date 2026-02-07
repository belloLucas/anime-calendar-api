import { Injectable } from '@nestjs/common';
import { CreateAnimeDto } from './dto/create-anime.dto';
import { UpdateAnimeDto } from './dto/update-anime.dto';
import { PaginationQueryDto } from './dto/pagination-query.dto';
import { PaginatedResponse } from './interfaces/paginated-response.interface';
import { PrismaService } from 'src/prisma/prisma.service';
import { Anime, Prisma } from 'src/generated/prisma/client';

@Injectable()
export class AnimesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createAnimeDto: CreateAnimeDto) {
    return await this.prisma.anime.create({
      data: createAnimeDto,
    });
  }

  async findAll(
    paginationQuery?: PaginationQueryDto,
  ): Promise<PaginatedResponse<Anime>> {
    const page = paginationQuery?.page || 1;
    const limit = paginationQuery?.limit || 5;
    const sortBy = paginationQuery?.sortBy || 'createdAt';
    const order = paginationQuery?.order || 'desc';
    const skip = (page - 1) * limit;

    const where: Prisma.AnimeWhereInput = {};

    if (paginationQuery?.day) {
      where.release_day = paginationQuery.day;
    }

    if (paginationQuery?.year) {
      where.release_year = paginationQuery.year;
    }

    if (paginationQuery?.recommended !== undefined) {
      where.is_recommended = paginationQuery.recommended;
    }

    if (paginationQuery?.search) {
      where.title = {
        contains: paginationQuery.search,
        mode: 'insensitive',
      };
    }

    const [animes, total] = await Promise.all([
      this.prisma.anime.findMany({
        where,
        skip,
        take: limit,
        orderBy: { [sortBy]: order },
      }),
      this.prisma.anime.count({ where }),
    ]);

    const totalPages = Math.ceil(total / limit);

    return {
      data: animes,
      meta: {
        total,
        page,
        limit,
        totalPages,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1,
      },
    };
  }

  async findOne(id: number) {
    return await this.prisma.anime.findUnique({
      where: { id },
    });
  }

  async update(id: number, updateAnimeDto: UpdateAnimeDto) {
    return await this.prisma.anime.update({
      where: { id },
      data: updateAnimeDto,
    });
  }

  async remove(id: number) {
    return await this.prisma.anime.delete({
      where: { id },
    });
  }
}
