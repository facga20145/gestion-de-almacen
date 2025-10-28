import { Controller, Get, HttpStatus, Param, Query, UseInterceptors } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import {
  ApiErrorResponses,
  ApiSuccessResponse,
} from 'src/utils/decorators/api-swagger.decorator';

// Use cases
import { LogEmailsFindOneUseCase } from '../../application/use-cases/queries/log-emails-find-one.use-case';
import { LogEmailsFindAllUseCase } from '../../application/use-cases/queries/log-emails-find-all.use-case';

import { CustomResponseInterceptor } from 'src/utils/interceptors/customresponse.interceptor';

@ApiTags('LogEmails')
@UseInterceptors(CustomResponseInterceptor)
@Controller('log-emails')
export class LogEmailsController {
  constructor(
    private readonly findOneUseCase: LogEmailsFindOneUseCase,
    private readonly findAllUseCase: LogEmailsFindAllUseCase,
  ) {}

  @Get(':id')
  @ApiOperation({
    summary: 'Obtener log de email por ID',
    description: 'Permite obtener un registro de envío de email específico',
  })
  @ApiSuccessResponse(
    HttpStatus.OK,
    'Log de email encontrado correctamente',
  )
  @ApiErrorResponses(
    HttpStatus.BAD_REQUEST,
    HttpStatus.NOT_FOUND,
    HttpStatus.INTERNAL_SERVER_ERROR,
  )
  async findOne(@Param('id') id: string) {
    return await this.findOneUseCase.run(parseInt(id));
  }

  @Get()
  @ApiOperation({
    summary: 'Listar logs de emails',
    description: 'Permite obtener una lista paginada de logs de envío de emails',
  })
  @ApiSuccessResponse(
    HttpStatus.OK,
    'Logs de emails encontrados correctamente',
  )
  @ApiErrorResponses(
    HttpStatus.BAD_REQUEST,
    HttpStatus.INTERNAL_SERVER_ERROR,
  )
  async findAll(@Query() params: any) {
    return await this.findAllUseCase.run(params);
  }
}