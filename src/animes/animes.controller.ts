import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { AnimesService } from './animes.service';
import { CreateAnimeDto } from './dto/create-anime.dto';
import { UpdateAnimeDto } from './dto/update-anime.dto';
import { PaginationQueryDto } from './dto/pagination-query.dto';

@ApiTags('animes')
@Controller('animes')
export class AnimesController {
  constructor(private readonly animesService: AnimesService) {}

  @Post()
  @ApiOperation({ summary: 'Criar um novo anime' })
  @ApiResponse({
    status: 201,
    description: 'Anime criado com sucesso',
  })
  @ApiResponse({ status: 400, description: 'Dados inválidos' })
  create(@Body() createAnimeDto: CreateAnimeDto) {
    return this.animesService.create(createAnimeDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos os animes com paginação' })
  @ApiResponse({
    status: 200,
    description: 'Lista de animes retornada com sucesso',
  })
  findAll(@Query() paginationQuery: PaginationQueryDto) {
    return this.animesService.findAll(paginationQuery);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar um anime por ID' })
  @ApiParam({ name: 'id', description: 'ID do anime', example: 1 })
  @ApiResponse({ status: 200, description: 'Anime encontrado' })
  @ApiResponse({ status: 404, description: 'Anime não encontrado' })
  findOne(@Param('id') id: string) {
    return this.animesService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar um anime' })
  @ApiParam({ name: 'id', description: 'ID do anime', example: 1 })
  @ApiResponse({ status: 200, description: 'Anime atualizado com sucesso' })
  @ApiResponse({ status: 404, description: 'Anime não encontrado' })
  update(@Param('id') id: string, @Body() updateAnimeDto: UpdateAnimeDto) {
    return this.animesService.update(+id, updateAnimeDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Deletar um anime' })
  @ApiParam({ name: 'id', description: 'ID do anime', example: 1 })
  @ApiResponse({ status: 204, description: 'Anime deletado com sucesso' })
  @ApiResponse({ status: 404, description: 'Anime não encontrado' })
  remove(@Param('id') id: string) {
    return this.animesService.remove(+id);
  }
}
