import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsString } from 'class-validator';
import { CoreEntity } from 'src/common/entity/core.entity';
import { Column, Entity } from 'typeorm';

@InputType('MeetingRoomInputType', { isAbstract: true })
@ObjectType()
@Entity()
export class MeetingRoom extends CoreEntity {
  @Field(() => String)
  @Column()
  @IsString()
  name: string;
}
