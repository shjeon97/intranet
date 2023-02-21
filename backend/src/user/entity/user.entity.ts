import { InternalServerErrorException } from '@nestjs/common';
import {
  Field,
  InputType,
  ObjectType,
  registerEnumType,
} from '@nestjs/graphql';
import {
  IsEmail,
  IsEnum,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { CoreEntity } from 'src/common/entity/core.entity';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
} from 'typeorm';
import { Role } from './role.entity';
import { Team } from './team.entity';
import * as bcrypt from 'bcrypt';

export enum UserStatus {
  Unapproved = '미승인',
  Work = '근무',
  LeaveOfAbsence = '휴직',
  MaternityLeave = '출산휴가',
  Resignation = '퇴사',
}
registerEnumType(UserStatus, { name: 'UserStatus' });

@InputType('UserInputType', { isAbstract: true })
@ObjectType()
@Entity()
export class User extends CoreEntity {
  @Field(() => String)
  @Column({ unique: true })
  @IsEmail()
  email: string;

  @Field(() => String)
  @Column()
  @IsString()
  position: string;

  @Field(() => String)
  @Column({ select: false })
  @IsString()
  @MinLength(8)
  @MaxLength(16)
  password: string;

  @Field(() => String)
  @Column()
  @IsString()
  name: string;

  @Field(() => String)
  @Column({ type: 'date' })
  @IsString()
  birthday: string;

  @Field(() => String)
  @Column({ type: 'date' })
  @IsString()
  startDate: string;

  @Field(() => String)
  @Column({ unique: true })
  @IsString()
  phone: string;

  @Field(() => UserStatus)
  @Column({ type: 'enum', enum: UserStatus, default: UserStatus.Unapproved })
  @IsEnum(UserStatus)
  status: UserStatus;

  @Field(() => [Role])
  @ManyToMany(() => Role, (roles) => roles.users, { eager: true })
  @JoinTable({ name: 'user_role' })
  roles: Role[];

  @Field(() => [Team])
  @ManyToMany(() => Team, (teams) => teams.users, { eager: true })
  @JoinTable({ name: 'user_team' })
  teams: Team[];

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword(): Promise<void> {
    if (this.password) {
      try {
        this.password = await bcrypt.hash(this.password, 10);
      } catch (e) {
        throw new InternalServerErrorException();
      }
    }
  }
}
