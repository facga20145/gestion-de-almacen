import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { RolesCreateUseCase } from '../../application/use-cases/commands/roles-create.use-case';
import { ApiOperation } from '@nestjs/swagger';
import { ApiErrorResponses, ApiSuccessResponse } from 'src/utils/decorators/api-swagger.decorator';
import { RolesCreateResponseDto } from '../../application/dtos/roles-create-response.dto';
import { RolesCreateRequestDto } from '../../application/dtos/roles-create-request.dto';

@Controller('roles')
export class RolesController {
  constructor(
    private readonly createUseCase: RolesCreateUseCase,

  ) {}

  @Post()
  @ApiOperation({
    summary: 'Crear nuevo registro de un rol',
    description: 'Permite registrar un nuevo rol',
  })
  @ApiSuccessResponse(
    HttpStatus.CREATED,
    'Rol registrado correctamente',
    RolesCreateResponseDto,
  )
  @ApiErrorResponses(
    HttpStatus.BAD_REQUEST,
    HttpStatus.CONFLICT,
    HttpStatus.INTERNAL_SERVER_ERROR,
  )
  async create(@Body() request: RolesCreateRequestDto) {
    return await this.createUseCase.run(request);
  }
}