import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Enable CORS for the frontend
  app.enableCors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000', // Frontend URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  });
  
  // Listen on port 3001 by default (or use PORT from environment)
  await app.listen(process.env.PORT ?? 3001);
  
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
