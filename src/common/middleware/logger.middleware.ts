import {Injectable, Logger, NestMiddleware} from '@nestjs/common';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    Logger.log('Request: ' + '\n' +
        'url: ' + req.baseUrl + '\n' +
        'method: ' + req.method + '\n',
    );
    next();
  }
}
