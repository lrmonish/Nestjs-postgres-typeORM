import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  BadRequestException,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    if (exception instanceof BadRequestException) {
      const ctx = host.switchToHttp();
      const response = ctx.getResponse<Response>();
      console.log(exception.getResponse());
      let res = exception.getResponse();
      let statusCode = exception.getStatus();

      let tempRes = JSON.stringify(res);
      let finalRes = JSON.parse(tempRes);

      response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: statusCode,
        timestamp: new Date().toISOString(),
        path: request.url,
        message: finalRes.message || 'Something Went Wrong',
      });
    } else {
      const status =
        exception instanceof HttpException
          ? exception.getStatus()
          : HttpStatus.INTERNAL_SERVER_ERROR;

      response.status(status).json({
        statusCode: status,
        timestamp: new Date().toISOString(),
        path: request.url,
        message: exception.message || 'Something Went Wrong',
      });
    }
  }
}
