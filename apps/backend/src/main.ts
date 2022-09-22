import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({ origin: '*' });
  app.setGlobalPrefix('api');
  const options = new DocumentBuilder()
    .setTitle('API')
    .setDescription('The API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000, '0.0.0.0', () => {
    console.log(
      `server listening on http://localhost:3000`,
    );
  });

}
bootstrap();
