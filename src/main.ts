import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {DocumentBuilder, SwaggerModule} from '@nestjs/swagger';
import {Logger} from '@nestjs/common';
import * as csurf from 'csurf';
import * as rateLimit from 'express-rate-limit';
import * as helmet from 'helmet';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const options = new DocumentBuilder()
      .setTitle('Coach template')
      .setDescription('The coach microservice API description')
      .setVersion('1.0')
      .addTag('coach')
      .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  // Security
  app.use(helmet());
  app.enableCors();
  app.use(csurf());

  // somewhere in your initialization file
  app.use(
      rateLimit({
        windowMs: 15 * 60 * 1000, // 15 minutes
        max: 100, // limit each IP to 100 requests per windowMs
      }),
  );


  await app.listen(process.env.PORT, () => {
    new Logger('http').log(`Application is listening on port ${process.env.PORT}`);
  });

}
bootstrap();
