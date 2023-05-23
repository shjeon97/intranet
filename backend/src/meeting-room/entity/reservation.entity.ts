import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsString } from 'class-validator';
import { CoreEntity } from 'src/common/entity/core.entity';
import { User } from 'src/user/entity/user.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  RelationId,
} from 'typeorm';
import { MeetingRoom } from './meeting-room.entity';

@InputType('ReservationInputType', { isAbstract: true })
@ObjectType()
@Entity()
export class Reservation extends CoreEntity {
  @Field(() => MeetingRoom)
  @ManyToOne(() => MeetingRoom, { eager: true })
  meetingRoom: MeetingRoom;

  @Column()
  @RelationId((reservation: Reservation) => reservation.meetingRoom)
  meetingRoomId: number;

  @Field(() => String)
  @Column()
  @IsString()
  title: string;

  @Field(() => String)
  @Column()
  @IsString()
  reason: string;

  @Field(() => String)
  @Column({ type: 'date' })
  @IsString()
  date: string;

  @Field(() => String, { nullable: true })
  @Column({ type: 'time', nullable: true })
  @IsString()
  startTime?: string;

  @Field(() => String, { nullable: true })
  @Column({ type: 'time', nullable: true })
  @IsString()
  endTime?: string;

  @Field(() => [User])
  @ManyToMany(() => User, (users) => users.reservations, { eager: true })
  @JoinTable({ name: 'reservation_user' })
  users: User[];
}
