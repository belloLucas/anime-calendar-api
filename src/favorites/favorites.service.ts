import {
  Injectable,
  NotFoundException,
  ConflictException,
  ForbiddenException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateFavoriteDto } from './dto/create-favorite.dto';

@Injectable()
export class FavoritesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(userId: string, createFavoriteDto: CreateFavoriteDto) {
    const { animeId } = createFavoriteDto;

    const anime = await this.prisma.anime.findUnique({
      where: { id: animeId },
    });

    if (!anime) {
      throw new NotFoundException(`Anime com ID ${animeId} não encontrado`);
    }

    const existingFavorite = await this.prisma.favorites.findUnique({
      where: {
        userId_animeId: {
          userId,
          animeId,
        },
      },
    });

    if (existingFavorite) {
      throw new ConflictException('Este anime já está nos seus favoritos');
    }

    try {
      const favorite = await this.prisma.favorites.create({
        data: {
          userId,
          animeId,
        },
        include: {
          anime: true,
        },
      });

      return {
        message: 'Anime adicionado aos favoritos com sucesso',
        favorite,
      };
    } catch (error) {
      throw new BadRequestException('Erro ao adicionar anime aos favoritos');
    }
  }

  async findAll(userId: string) {
    try {
      const favorites = await this.prisma.favorites.findMany({
        where: { userId },
        include: {
          anime: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
      });

      return {
        total: favorites.length,
        favorites,
      };
    } catch (error) {
      throw new BadRequestException('Erro ao buscar favoritos');
    }
  }

  async findOne(id: string, userId: string) {
    const favorite = await this.prisma.favorites.findUnique({
      where: { id },
      include: {
        anime: true,
      },
    });

    if (!favorite) {
      throw new NotFoundException('Favorito não encontrado');
    }

    if (favorite.userId !== userId) {
      throw new ForbiddenException(
        'Você não tem permissão para acessar este favorito',
      );
    }

    return favorite;
  }

  async findByAnimeId(userId: string, animeId: number) {
    const favorite = await this.prisma.favorites.findUnique({
      where: {
        userId_animeId: {
          userId,
          animeId,
        },
      },
      include: {
        anime: true,
      },
    });

    if (!favorite) {
      throw new NotFoundException('Este anime não está nos seus favoritos');
    }

    return favorite;
  }

  async remove(id: string, userId: string) {
    const favorite = await this.prisma.favorites.findUnique({
      where: { id },
    });

    if (!favorite) {
      throw new NotFoundException('Favorito não encontrado');
    }

    if (favorite.userId !== userId) {
      throw new ForbiddenException(
        'Você não tem permissão para remover este favorito',
      );
    }

    try {
      await this.prisma.favorites.delete({
        where: { id },
      });

      return {
        message: 'Anime removido dos favoritos com sucesso',
      };
    } catch (error) {
      throw new BadRequestException('Erro ao remover favorito');
    }
  }

  async removeByAnimeId(userId: string, animeId: number) {
    const favorite = await this.prisma.favorites.findUnique({
      where: {
        userId_animeId: {
          userId,
          animeId,
        },
      },
    });

    if (!favorite) {
      throw new NotFoundException('Este anime não está nos seus favoritos');
    }

    try {
      await this.prisma.favorites.delete({
        where: {
          userId_animeId: {
            userId,
            animeId,
          },
        },
      });

      return {
        message: 'Anime removido dos favoritos com sucesso',
      };
    } catch (error) {
      throw new BadRequestException('Erro ao remover favorito');
    }
  }

  async checkIsFavorite(userId: string, animeId: number): Promise<boolean> {
    const favorite = await this.prisma.favorites.findUnique({
      where: {
        userId_animeId: {
          userId,
          animeId,
        },
      },
    });

    return !!favorite;
  }
}
