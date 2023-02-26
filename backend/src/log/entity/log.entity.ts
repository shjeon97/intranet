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

  @Column()
  message: string;

  @Field(() => Date)
  @CreateDateColumn()
  createdAt: Date;
}
