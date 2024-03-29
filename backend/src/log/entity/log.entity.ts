import {
  Field,
  InputType,
  ObjectType,
  registerEnumType,
} from '@nestjs/graphql';
import { IsEnum } from 'class-validator';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

export enum LogType {
  Login = 'Login',
  startWork = '근무시작',
  endWork = '근무종료',
  editNotice = '공지수정',
}
registerEnumType(LogType, { name: 'LogType' });

@InputType('LogInputType', { isAbstract: true })
@ObjectType()
@Entity()
export class Log {
  @Field(() => Number)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => LogType)
  @Column({ type: 'enum', enum: LogType })
  @IsEnum(LogType)
  type: LogType;

  @Field(() => Object, { nullable: true })
  @Column({ type: 'json', nullable: true })
  contents?: object;

  @Field(() => Date)
  @CreateDateColumn()
  createdAt: Date;
}
