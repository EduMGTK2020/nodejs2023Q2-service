import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  ParseUUIDPipe,
  NotFoundException,
  HttpCode,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiTags,
  ApiOperation,
  ApiOkResponse,
  ApiParam,
  ApiNotFoundResponse,
  ApiNoContentResponse,
} from '@nestjs/swagger';

import { AlbumService } from './album.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Album } from './entities/album.entity';

@Controller('album')
@ApiTags('Album')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @Get()
  @ApiOperation({
    summary: 'get all albums',
  })
  @ApiOkResponse({
    description: 'Albums successfully getted',
    type: [Album],
  })
  findAll() {
    return this.albumService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'get single album by id',
  })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'Id of album',
    type: 'string',
  })
  @ApiOkResponse({
    description: 'Album successfully getted',
    type: Album,
  })
  @ApiBadRequestResponse({
    description: 'Album id is invalid (not UUID)',
  })
  @ApiNotFoundResponse({
    description: 'Album with given id not found',
  })
  findOne(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    const album = this.albumService.findOne(id);
    if (!album) {
      throw new NotFoundException(`Album with id ${id} not found`);
    }
    return album;
  }

  @Post()
  @ApiOperation({
    summary: 'create new album',
  })
  @ApiBody({
    type: CreateAlbumDto,
    description: 'Data for new album',
  })
  @ApiCreatedResponse({
    description: 'Album successfully created',
    type: Album,
  })
  @ApiBadRequestResponse({
    description: 'Request body does not contain required fields',
  })
  create(@Body() createAlbumDto: CreateAlbumDto) {
    return this.albumService.create(createAlbumDto);
  }

  @Put(':id')
  @ApiOperation({
    summary: 'update album info',
  })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'Id of album',
    type: 'string',
  })
  @ApiBody({
    type: UpdateAlbumDto,
    description: 'Data for update album',
  })
  @ApiOkResponse({
    description: 'Album successfully updated',
    type: Album,
  })
  @ApiBadRequestResponse({
    description: 'Album id is invalid (not UUID)',
  })
  @ApiNotFoundResponse({ description: 'Album with given id not found' })
  update(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() updateAlbumDto: UpdateAlbumDto,
  ) {
    const album = this.albumService.update(id, updateAlbumDto);
    if (!album) {
      throw new NotFoundException(`Album with id ${id} not found`);
    }
    return album;
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'delete album',
  })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'Id of album',
    type: 'string',
  })
  @ApiNoContentResponse({
    description: 'Album successfully deleted',
  })
  @ApiBadRequestResponse({
    description: 'Album id is invalid (not UUID)',
  })
  @ApiNotFoundResponse({ description: 'Album with given id not found' })
  @HttpCode(204)
  remove(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.albumService.remove(id);
  }
}
