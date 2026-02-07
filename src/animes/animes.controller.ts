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
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { AnimesService } from './animes.service';
import { CreateAnimeDto } from './dto/create-anime.dto';
import { UpdateAnimeDto } from './dto/update-anime.dto';
import { PaginationQueryDto } from './dto/pagination-query.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from 'src/generated/prisma/client';

@ApiTags('animes')
@Controller('animes')
export class AnimesController {
  constructor(private readonly animesService: AnimesService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Criar um novo anime (Apenas Admin)' })
  @ApiResponse({
    status: 201,
    description: 'Anime criado com sucesso',
  })
  @ApiResponse({ status: 400, description: 'Dados inválidos' })
  @ApiResponse({ status: 401, description: 'Não autenticado' })
  @ApiResponse({ status: 403, description: 'Sem permissão (apenas ADMIN)' })
  create(@Body() createAnimeDto: CreateAnimeDto) {
    return this.animesService.create(createAnimeDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos os animes com paginação (Público)' })
  @ApiResponse({
    status: 200,
    description: 'Lista de animes retornada com sucesso',
  })
  findAll(@Query() paginationQuery: PaginationQueryDto) {
    return this.animesService.findAll(paginationQuery);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar um anime por ID (Público)' })
  @ApiParam({ name: 'id', description: 'ID do anime', example: 1 })
  @ApiResponse({ status: 200, description: 'Anime encontrado' })
  @ApiResponse({ status: 404, description: 'Anime não encontrado' })
  findOne(@Param('id') id: string) {
    return this.animesService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Atualizar um anime (Apenas Admin)' })
  @ApiParam({ name: 'id', description: 'ID do anime', example: 1 })
  @ApiResponse({ status: 200, description: 'Anime atualizado com sucesso' })
  @ApiResponse({ status: 404, description: 'Anime não encontrado' })
  @ApiResponse({ status: 401, description: 'Não autenticado' })
  @ApiResponse({ status: 403, description: 'Sem permissão (apenas ADMIN)' })
  update(@Param('id') id: string, @Body() updateAnimeDto: UpdateAnimeDto) {
    return this.animesService.update(+id, updateAnimeDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Deletar um anime (Apenas Admin)' })
  @ApiParam({ name: 'id', description: 'ID do anime', example: 1 })
  @ApiResponse({ status: 204, description: 'Anime deletado com sucesso' })
  @ApiResponse({ status: 404, description: 'Anime não encontrado' })
  @ApiResponse({ status: 401, description: 'Não autenticado' })
  @ApiResponse({ status: 403, description: 'Sem permissão (apenas ADMIN)' })
  remove(@Param('id') id: string) {
    return this.animesService.remove(+id);
  }
}
