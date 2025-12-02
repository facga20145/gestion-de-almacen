/*
https://docs.nestjs.com/exception-filters#exception-filters-1
*/

import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    // Log detallado en consola para depurar fácilmente
    // (incluye stack de Prisma, Validations, etc.)
    // Esto no se envía al cliente, solo al servidor.
    // eslint-disable-next-line no-console
    console.error('🔥 Global exception caught:', exception);

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message: any = 'Error interno';

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const res = exception.getResponse();
      message =
        typeof res === 'string' ? res : res['message'] || 'Error interno';
    }

    response.status(status).json({
      status_code: status,
      error: HttpStatus[status],
      message,
      data: null,
    });
  }
}
