import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Request, Response, NextFunction } from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: 'http://localhost:3001', // Frontend URL - adjust if running on different port
    credentials: true,
  });

  app.use((req: Request, res: Response, next: NextFunction) => {
    const myAppHeader = req.header('my-app');

    if (myAppHeader === 'chat') {
      next();
    } else {
      res.status(401).json({
        statusCode: 401,
        // message: 'Unauthorized: Missing or invalid "my-app: chat" header',
      });
    }
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
