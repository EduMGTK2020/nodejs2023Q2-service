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
  ApiBearerAuth,
} from '@nestjs/swagger';

import { ArtistService } from './artist.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { Artist } from './entities/artist.entity';

@ApiBearerAuth()
@Controller('artist')
@ApiTags('Artist')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @Get()
  @ApiOperation({
    summary: 'get all artists',
  })
  @ApiOkResponse({
    description: 'Artists successfully getted',
    type: [Artist],
  })
  async findAll() {
    return await this.artistService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'get single artist by id',
  })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'Id of artist',
    type: 'string',
  })
  @ApiOkResponse({
    description: 'Artist successfully getted',
    type: Artist,
  })
  @ApiBadRequestResponse({
    description: 'Artist id is invalid (not UUID)',
  })
  @ApiNotFoundResponse({
    description: 'Artist with given id not found',
  })
  async findOne(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    const artist = await this.artistService.findOne(id);
    if (!artist) {
      throw new NotFoundException(`Artist with id ${id} not found`);
    }
    return artist;
  }

  @Post()
  @ApiOperation({
    summary: 'create new artist',
  })
  @ApiBody({
    type: CreateArtistDto,
    description: 'Data for new artist',
  })
  @ApiCreatedResponse({
    description: 'Artist successfully created',
    type: Artist,
  })
  @ApiBadRequestResponse({
    description: 'Request body does not contain required fields',
  })
  async create(@Body() createArtistDto: CreateArtistDto) {
    return await this.artistService.create(createArtistDto);
  }

  @Put(':id')
  @ApiOperation({
    summary: 'update artist info',
  })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'Id of artist',
    type: 'string',
  })
  @ApiBody({
    type: UpdateArtistDto,
    description: 'Data for update album',
  })
  @ApiOkResponse({
    description: 'Artist successfully updated',
    type: Artist,
  })
  @ApiBadRequestResponse({
    description: 'Artist id is invalid (not UUID)',
  })
  @ApiNotFoundResponse({ description: 'Artist with given id not found' })
  async update(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() updateArtistDto: UpdateArtistDto,
  ) {
    const artist = await this.artistService.findOne(id);
    if (!artist) {
      throw new NotFoundException(`Artist with id ${id} not found`);
    }
    return await this.artistService.update(id, updateArtistDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'delete artist',
  })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'Id of artist',
    type: 'string',
  })
  @ApiNoContentResponse({
    description: 'Artist successfully deleted',
  })
  @ApiBadRequestResponse({
    description: 'Artist id is invalid (not UUID)',
  })
  @ApiNotFoundResponse({ description: 'Artist with given id not found' })
  @HttpCode(204)
  async remove(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    const artist = await this.artistService.findOne(id);
    if (!artist) {
      throw new NotFoundException(`Artist with id ${id} not found`);
    }
    return await this.artistService.remove(id);
  }
}
