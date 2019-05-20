import {MiddlewareConsumer, Module, NestModule} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {UserModule} from './user/user.module';
import {LoggerMiddleware} from './common/middleware/logger.middleware';
import {APP_FILTER} from '@nestjs/core';
import {AllExceptionsFilter} from './common/filter/all-exceptions.filter';

@Module({
  imports: [UserModule],
  controllers: [AppController],
  providers: [AppService,
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
  ],
})
export class AppModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
    consumer
        .apply(LoggerMiddleware)
        .forRoutes('user');
  }
}
