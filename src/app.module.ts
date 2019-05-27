import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {UserModule} from './user/user.module';
import {APP_FILTER, APP_INTERCEPTOR} from '@nestjs/core';
import {AllExceptionsFilter} from './common/filter/all-exceptions.filter';
import {LoggingInterceptor} from './common/interceptor/logging.interceptor';
import * as path from 'path';
import { ConfigModule } from 'nestjs-config';

@Module({
  imports: [
    ConfigModule.load(path.resolve(__dirname, '**/!(*.d).config.{ts,js}'), {
      modifyConfigName: name => name.replace('.config', ''),
    }),
    UserModule,
  ],
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
