import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  HttpCode,
  HttpStatus,
  ParseIntPipe,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiParam,
} from '@nestjs/swagger';
import { FavoritesService } from './favorites.service';
import { CreateFavoriteDto } from './dto/create-favorite.dto';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('favorites')
@Controller('favorites')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Post()
  @ApiOperation({ summary: 'Adicionar anime aos favoritos' })
  @ApiResponse({
    status: 201,
    description: 'Anime adicionado aos favoritos com sucesso',
  })
  @ApiResponse({ status: 400, description: 'Dados inválidos' })
  @ApiResponse({ status: 401, description: 'Não autenticado' })
  @ApiResponse({ status: 404, description: 'Anime não encontrado' })
  @ApiResponse({ status: 409, description: 'Anime já está nos favoritos' })
  create(
    @Body() createFavoriteDto: CreateFavoriteDto,
    @CurrentUser() user: any,
  ) {
    return this.favoritesService.create(user.id, createFavoriteDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar meus favoritos' })
  @ApiResponse({
    status: 200,
    description: 'Lista de favoritos retornada com sucesso',
  })
  @ApiResponse({ status: 401, description: 'Não autenticado' })
  findAll(@CurrentUser() user: any) {
    return this.favoritesService.findAll(user.id);
  }

  @Get('check/:animeId')
  @ApiOperation({ summary: 'Verificar se um anime está nos favoritos' })
  @ApiParam({ name: 'animeId', description: 'ID do anime', example: 1 })
  @ApiResponse({
    status: 200,
    description: 'Retorna true se está favoritado, false caso contrário',
  })
  @ApiResponse({ status: 401, description: 'Não autenticado' })
  async checkIsFavorite(
    @Param('animeId', ParseIntPipe) animeId: number,
    @CurrentUser() user: any,
  ) {
    const isFavorite = await this.favoritesService.checkIsFavorite(
      user.id,
      animeId,
    );
    return { isFavorite };
  }

  @Get('anime/:animeId')
  @ApiOperation({ summary: 'Buscar favorito pelo ID do anime' })
  @ApiParam({ name: 'animeId', description: 'ID do anime', example: 1 })
  @ApiResponse({ status: 200, description: 'Favorito encontrado' })
  @ApiResponse({ status: 401, description: 'Não autenticado' })
  @ApiResponse({ status: 404, description: 'Anime não está nos favoritos' })
  findByAnimeId(
    @Param('animeId', ParseIntPipe) animeId: number,
    @CurrentUser() user: any,
  ) {
    return this.favoritesService.findByAnimeId(user.id, animeId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar favorito por ID' })
  @ApiParam({ name: 'id', description: 'ID do favorito', example: 'uuid' })
  @ApiResponse({ status: 200, description: 'Favorito encontrado' })
  @ApiResponse({ status: 401, description: 'Não autenticado' })
  @ApiResponse({ status: 403, description: 'Sem permissão' })
  @ApiResponse({ status: 404, description: 'Favorito não encontrado' })
  findOne(@Param('id') id: string, @CurrentUser() user: any) {
    return this.favoritesService.findOne(id, user.id);
  }

  @Delete('anime/:animeId')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Remover anime dos favoritos pelo ID do anime' })
  @ApiParam({ name: 'animeId', description: 'ID do anime', example: 1 })
  @ApiResponse({
    status: 200,
    description: 'Anime removido dos favoritos com sucesso',
  })
  @ApiResponse({ status: 401, description: 'Não autenticado' })
  @ApiResponse({ status: 404, description: 'Anime não está nos favoritos' })
  removeByAnimeId(
    @Param('animeId', ParseIntPipe) animeId: number,
    @CurrentUser() user: any,
  ) {
    return this.favoritesService.removeByAnimeId(user.id, animeId);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Remover favorito por ID' })
  @ApiParam({ name: 'id', description: 'ID do favorito', example: 'uuid' })
  @ApiResponse({
    status: 200,
    description: 'Favorito removido com sucesso',
  })
  @ApiResponse({ status: 401, description: 'Não autenticado' })
  @ApiResponse({ status: 403, description: 'Sem permissão' })
  @ApiResponse({ status: 404, description: 'Favorito não encontrado' })
  remove(@Param('id') id: string, @CurrentUser() user: any) {
    return this.favoritesService.remove(id, user.id);
  }
}
