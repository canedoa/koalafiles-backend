import 'dotenv/config'; //para cargar las variables de entorno desde el archivo .env antes de importar cualquier otro módulo
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: ['https://codewithsoul.com', 'http://localhost:4200'],

    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],

  });
  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
