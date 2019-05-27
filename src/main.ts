import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {DocumentBuilder, SwaggerModule} from '@nestjs/swagger';
import {Logger} from '@nestjs/common';

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

  await app.listen(process.env.PORT, () => {
    new Logger('http').log(`Application is listening on port ${process.env.PORT}`);
  });

}
bootstrap();
