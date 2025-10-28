import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  StreamableFile,
  HttpException,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

interface StandardResponse {
  statusCode: number;
  message: string;
  data?: any;
}

@Injectable()
export class CustomResponseInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<StandardResponse | StreamableFile> {
    const http = context.switchToHttp();
    const response = http.getResponse();
    const request = http.getRequest<Request>();
    const method = request.method;

    return next.handle().pipe(
      map((data) => {
        if (data instanceof StreamableFile) return data;

        const clientMessage =
          response.statusCode >= 200 && response.statusCode < 300
            ? 'Success'
            : 'Error';

        const isWriteOperation = ['POST', 'PUT', 'PATCH', 'DELETE'].includes(
          method,
        );

        // ✅ Devuelve todo el contenido si tiene más campos que solo "message"
        let payload: any = null;
        if (data) {
          if (
            isWriteOperation &&
            typeof data === 'object' &&
            'message' in data &&
            Object.keys(data).length === 1
          ) {
            // Solo tiene message (por ejemplo, en delete/update)
            payload = { message: data.message };
          } else {
            // ✅ Devuelve el objeto completo (message + token u otros campos)
            payload = data;
          }
        }

        return {
          statusCode: response.statusCode ?? 200,
          message: clientMessage,
          data: payload,
        } as StandardResponse;
      }),
      catchError((err) => {
        let statusCode = 500;
        let errorMessage = 'Internal server error';

        if (err instanceof HttpException) {
          statusCode = err.getStatus?.() ?? 500;
          const res = err.getResponse();
          if (typeof res === 'string') {
            errorMessage = res;
          } else if (typeof res === 'object' && res !== null) {
            const r = res as any;
            if (Array.isArray(r.message)) {
              errorMessage = r.message.join(', ');
            } else if (typeof r.message === 'string') {
              errorMessage = r.message;
            }
          }
        } else if (err?.message) {
          errorMessage = err.message;
        }

        return throwError(
          () =>
            new HttpException(
              {
                statusCode,
                message: 'Error',
                data: {
                  message: errorMessage,
                },
              },
              statusCode,
            ),
        );
      }),
    );
  }
}
