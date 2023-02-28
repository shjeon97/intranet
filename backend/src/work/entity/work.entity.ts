import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import { CoreEntity } from 'src/common/entity/core.entity';
import { User } from 'src/user/entity/user.entity';
import { Column, Entity, ManyToOne, RelationId } from 'typeorm';
import { WorkStatus } from './work-status.entity';

@InputType('WorkInputType', { isAbstract: true })
@ObjectType()
@Entity()
export class Work extends CoreEntity {
  @Field(() => User)
  @ManyToOne(() => User, { eager: true })
  user: User;

  @Column()
  @RelationId((work: Work) => work.user)
  userId: number;

  @Field(() => WorkStatus)
  @ManyToOne(() => WorkStatus, { eager: true })
  workStatus: WorkStatus;

  @Column()
  @RelationId((work: Work) => work.workStatus)
  workStatusId: number;

  @Field(() => String)
  @Column({ type: 'date' })
  @IsString()
  date: string;

  @Field(() => String)
  @Column({ type: 'time', nullable: true })
  @IsOptional()
  @IsString()
  startTime?: string;

  @Field(() => String)
  @Column({ type: 'time', nullable: true })
  @IsOptional()
  @IsString()
  endTime?: string;

  @Field(() => String)
  @Column({ nullable: true })
  @IsOptional()
  @IsString()
  memo?: string;

  @Field(() => String)
  @Column({ nullable: true })
  @IsOptional()
  @IsString()
  overtimeReason?: string;

  @Field(() => Number)
  @Column({ nullable: true })
  @IsOptional()
  @IsNumber()
  approvalUserId?: number;
}
