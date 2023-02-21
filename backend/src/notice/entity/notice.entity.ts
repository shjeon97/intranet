import {
  Field,
  InputType,
  ObjectType,
  registerEnumType,
} from '@nestjs/graphql';
import { IsEnum, IsNumber, IsString } from 'class-validator';
import { CoreEntity } from 'src/common/entity/core.entity';
import { User } from 'src/user/entity/user.entity';
import { Column, Entity, ManyToOne, RelationId } from 'typeorm';

export enum NoticeStatus {
  Anyone = 'Anyone',
  Writer = 'Writer',
}
registerEnumType(NoticeStatus, { name: 'NoticeStatus' });

@InputType('NoticeInputType', { isAbstract: true })
@ObjectType()
@Entity()
export class Notice extends CoreEntity {
  @Field(() => User)
  @ManyToOne(() => User)
  user: User;

  @Column()
  @RelationId((notice: Notice) => notice.user)
  @Field(() => String)
  @Column()
  @IsString()
  title: string;

  @Field(() => String)
  @Column()
  @IsString()
  contents: string;

  @Field(() => NoticeStatus)
  @Column({ type: 'enum', enum: NoticeStatus, default: NoticeStatus.Anyone })
  @IsEnum(NoticeStatus)
  status: NoticeStatus;

  @Field(() => Number)
  @Column({ nullable: true })
  @IsNumber()
  lastUpdateUserId?: number;
}