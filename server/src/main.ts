import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.useGlobalPipes(new ValidationPipe());
    process.env.NODE_ENV === 'development' && app.enableCors({ origin: '*' });
    app.setGlobalPrefix('api');
    // if (process.env.NODE_ENV === 'development') {
    //     const viteDevServer = await import('vite').then((v) =>
    //         v.createServer({
    //             server: { middlewareMode: true },
    //             root: '../web',
    //             base: '/',
    //         }),
    //     );
    //     app.use((req: Request, res: Response, next: NextFunction) => {
    //         if (req.url.startsWith('/api')) {
    //             next();
    //         } else {
    //             viteDevServer.middlewares(req, res, next);
    //         }
    //     });
    // }

    await app.listen(3000);
}
bootstrap();
