import { Injectable } from '@nestjs/common';
import { CreateAnimeDto } from './dto/create-anime.dto';
import { UpdateAnimeDto } from './dto/update-anime.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AnimesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createAnimeDto: CreateAnimeDto) {
    return await this.prisma.anime.create({
      data: createAnimeDto,
    });
  }

  async findAll() {
    const animes = await this.prisma.anime.findMany();
    return animes;
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
