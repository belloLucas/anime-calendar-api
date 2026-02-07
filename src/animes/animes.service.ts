import { Injectable } from '@nestjs/common';
import { CreateAnimeDto } from './dto/create-anime.dto';
import { UpdateAnimeDto } from './dto/update-anime.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AnimesService {
  constructor(private readonly prisma: PrismaService) {}

  create(createAnimeDto: CreateAnimeDto) {
    return 'This action adds a new anime';
  }

  async findAll() {
    const animes = await this.prisma.anime.findMany();
    return animes;
  }

  findOne(id: number) {
    return `This action returns a #${id} anime`;
  }

  update(id: number, updateAnimeDto: UpdateAnimeDto) {
    return `This action updates a #${id} anime`;
  }

  remove(id: number) {
    return `This action removes a #${id} anime`;
  }
}
