import {
  Field,
  InputType,
  ObjectType,
  registerEnumType,
} from '@nestjs/graphql';
import { IsEnum } from 'class-validator';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';

export enum RoleName {
  Any = 'Any',
  Admin = 'Admin',
  TeamLeader = 'TeamLeader',
}
registerEnumType(RoleName, { name: 'RoleName' });

@InputType('RoleInputType', { isAbstract: true })
@ObjectType()
@Entity()
export class Role {
  @Field(() => Number)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => RoleName)
  @Column({ type: 'enum', enum: RoleName })
  @IsEnum(RoleName)
  name: RoleName;

  @Field(() => [User])
  @ManyToMany(() => User, (users) => users.roles)
  users: User[];
}
