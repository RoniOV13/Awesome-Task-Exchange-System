import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import * as session from 'express-session';
import * as passport from 'passport';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
const MongoStore = require('connect-mongo')

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(
    session({
      store: MongoStore.create({ mongoUrl: 'mongodb://localhost:27017/auth' }),
      secret: process.env.SESSION_SECRET, 
      resave: false, 
      saveUninitialized: false,
      rolling: true, 
      cookie: {
        maxAge: 30 * 60 * 1000, 
        httpOnly: true, 
      },
    }),
  );
  app.use(passport.initialize());
  app.use(passport.session());

 
  app.enableCors({ origin: '*' });
  app.setGlobalPrefix('api');
  const options = new DocumentBuilder()
    .setTitle('auth example')
    .setDescription('The auth API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('swagger', app, document);
  
  await app.listen(3001, () => {
    console.log(`server start on http://localhost:3001`);
  });
}
bootstrap();
