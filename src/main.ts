import { NestExpressApplication } from '@nestjs/platform-express';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerConfig } from './configuration';
import * as auth from 'express-basic-auth';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv'
dotenv.config()

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.use(
    'api/v1/backend_todolist/docs',
    auth({
      challenge: true,
      users: {developer: `${process.env.SWAGGER_PASS}`},
    }),
  );
  app.setGlobalPrefix('api/v1');
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());

  SwaggerConfig.ConfigSwaggerModule(app);
  await app.listen(3000);
}
bootstrap();
