import { Field, ObjectType } from '@nestjs/graphql';
import { IsArray, IsNumber, IsString } from 'class-validator';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';

@ObjectType()
@Entity()
export class Team {
  @Field(() => Number)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => String)
  @Column({ unique: true })
  @IsString()
  name: string;

  @Field(() => Number)
  @Column()
  @IsNumber()
  level: number;

  @Field(() => [Number])
  @Column('int', { array: true, nullable: true })
  @IsArray()
  subTeamIds?: number[];

  @Field(() => [User])
  @ManyToMany(() => User, (users) => users.teams)
  users: User[];
}
