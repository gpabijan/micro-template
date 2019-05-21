import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {UserModule} from './user/user.module';
import {APP_FILTER, APP_INTERCEPTOR} from '@nestjs/core';
import {AllExceptionsFilter} from './common/filter/all-exceptions.filter';
import {LoggingInterceptor} from './common/interceptor/logging.interceptor';

@Module({
  imports: [UserModule],
  controllers: [AppController],
  providers: [AppService,
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
  ],
})
export class AppModule {}
