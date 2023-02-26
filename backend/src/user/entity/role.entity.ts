import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsString } from 'class-validator';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';
@InputType('RoleInputType', { isAbstract: true })
@ObjectType()
@Entity()
export class Role {
  @Field(() => Number)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => String)
  @Column({ unique: true })
  @IsString()
  name: string;

  @Field(() => [User])
  @ManyToMany(() => User, (users) => users.roles)
  users: User[];
}
