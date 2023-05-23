import { Module } from '@nestjs/common';
import { MeetingRoomService, ReservationService } from './meeting-room.service';
import {
  MeetingRoomResolver,
  ReservationResolver,
} from './meeting-room.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MeetingRoom } from './entity/meeting-room.entity';
import { Reservation } from './entity/reservation.entity';
import { User } from 'src/user/entity/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MeetingRoom, Reservation, User])],
  providers: [
    MeetingRoomService,
    ReservationService,
    MeetingRoomResolver,
    ReservationResolver,
  ],
})
export class MeetingRoomModule {}
