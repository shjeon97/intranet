import { Field, InputType, OmitType, PartialType } from '@nestjs/graphql';
import { Reservation } from '../entity/reservation.entity';

@InputType()
export class CreateReservationInput extends PartialType(
  OmitType(Reservation, [
    'id',
    'createdAt',
    'updatedAt',
    'meetingRoom',
    'users',
  ]),
) {
  @Field(() => [Number])
  userIds?: number[];

  @Field(() => Number)
  meetingRoomId?: number;
}
