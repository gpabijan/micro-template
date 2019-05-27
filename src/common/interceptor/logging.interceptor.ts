import {CallHandler, ExecutionContext, Injectable, Logger, NestInterceptor} from '@nestjs/common';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';
import {RequestLog} from './interface/requestLog';
import {ResponseLog} from './interface/responseLog';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private req: RequestLog = new RequestLog();
  private resp: ResponseLog = new ResponseLog();

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const ctx = context.switchToHttp();
    const request = ctx.getRequest();
    const response = ctx.getResponse();

    // const request = context.switchToHttp().getRequest();
    this.setRequest(request);
    new Logger('REST').log(this.req);
    const now = Date.now();
    return next
        .handle()
        .pipe(
            tap(() => {
              this.setResponse(response, now);
              new Logger('REST').log(this.resp);
            }),
        );
  }

  setRequest(request: any) {
    this.req.date = new Date();
    this.req.body = request.body;
    this.req.method = request.method;
    this.req.type = 'REQUEST';
    this.req.url = request.url;
  }

  setResponse(response: any, now: any) {
    this.resp.type = 'RESPONSE';
    this.resp.code = response.statusCode;
    this.resp.body = response.body;
    this.resp.time = `${Date.now() - now}ms`;

  }
}
