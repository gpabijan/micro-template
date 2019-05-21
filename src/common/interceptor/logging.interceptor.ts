import {CallHandler, ExecutionContext, Injectable, Logger, NestInterceptor} from '@nestjs/common';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';
import {RequestLog} from './interface/requestLog';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private zmienna: RequestLog = new RequestLog();

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    Logger.log('Before...');
    const request = context.switchToHttp().getRequest();
    this.setRequest(request);
    Logger.log(this.zmienna);
    const now = Date.now();
    return next
        .handle()
        .pipe(
            tap(() => Logger.log(`After... ${Date.now() - now}ms`)),
        );
  }

  setRequest(request: any) {
    this.zmienna.date = new Date();
    this.zmienna.body = request.body;
    this.zmienna.method = request.method;
    this.zmienna.type = 'REQUEST';
    this.zmienna.url = request.url;
  }
}
