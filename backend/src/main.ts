import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ApolloError } from 'apollo-server-express';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 속성 확인
  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: (validationErrors: any[] = []) => {
        throw new ApolloError(
          `${validationErrors.map((i) => Object.values(i.constraints)[0])}`,
        );
      },
    }),
  );

  // 서버 접근 url 정의
  if (process.env.NODE_ENV === 'prod') {
    app.enableCors({
      origin: ['https://intranet.prod.kro.kr'],
      credentials: true,
    });
  }
  // 배포환경 이외는 모든 접근 허용
  else {
    app.enableCors({
      origin: true,
      credentials: true,
    });
  }

  // 실행 포트 정의
  try {
    await app.listen(process.env.PORT, '0.0.0.0', () =>
      console.log(
        `Running on Port ${process.env.PORT} ${process.env.NODE_ENV}`,
        process.env.SERVER_ADDRESS,
      ),
    );
  } catch (error) {
    console.log(error);
  }
}
bootstrap();
