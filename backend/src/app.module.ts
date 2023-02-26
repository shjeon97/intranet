import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/entity/user.entity';
import { UserModule } from './user/user.module';
import { Role } from './user/entity/role.entity';
import { Team } from './user/entity/team.entity';
import { CommonModule } from './common/common.module';
import { AuthModule } from './auth/auth.module';
import { NoticeModule } from './notice/notice.module';
import { Notice } from './notice/entity/notice.entity';
import { LogModule } from './log/log.module';
import { Log } from './log/entity/log.entity';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      context: ({ req }) => {
        const clientIp = req.headers['x-real-ip'];

        if (req.headers.authorization) {
          const token = req.headers.authorization.substr(7);
          return { token, clientIp };
        }
        return { clientIp };
      },
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      // 사용할  env 파일 정의
      envFilePath:
        process.env.NODE_ENV === 'dev'
          ? '.env.development'
          : process.env.NODE_ENV === 'test'
          ? '.env.test'
          : process.env.NODE_ENV === 'prod' && '.env.production',
      // env 변수 체크
      validationSchema: Joi.object({
        NODE_ENV: Joi.string().valid('dev', 'prod', 'test').required(),
        DB_HOST: Joi.string().required(),
        DB_PORT: Joi.string().required(),
        DB_USERNAME: Joi.string().required(),
        DB_PASSWORD: Joi.string().required(),
        DB_NAME: Joi.string().required(),
        PRIVATE_KEY: Joi.string().required(),
        SERVER_ADDRESS: Joi.string().required(),
        GMAIL_SMTP_NAME: Joi.string().required(),
        GMAIL_SMTP_KEY: Joi.string().required(),
      }),
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      // 계정 정보
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      // DB 이름
      database: process.env.DB_NAME,
      // 마이그레이션
      synchronize: process.env.NODE_ENV !== 'prod',
      // DB로그
      logging: false,
      // hot load 사용시 선언
      keepConnectionAlive: true,
      // 사용할 entity들 선언
      entities: [User, Role, Team, Notice, Log],
    }),
    UserModule,
    CommonModule,
    AuthModule,
    NoticeModule,
    LogModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
