import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Response<T> {
  status: number;
  message: string;
  response: T;
}

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, Response<T>> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<Response<T>> {
    const res = context.switchToHttp().getResponse();
    
    return next.handle().pipe(
      map((data) => ({
        status: res.statusCode,
        message: data?.message || 'Success',
        response: data?.response !== undefined ? data.response : data,
      })),
    );
  }
}