import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Role } from 'src/auth/decorator/role.decorator';
import { CoreOutput } from 'src/common/dto/output.dto';
import { RoleName } from 'src/user/entity/role.entity';
import { AllMeetingRoomOutput } from './dto/all-meeting-room.dto';
import { CreateMeetingRoomInput } from './dto/create-meeting-room.dto';
import { CreateReservationInput } from './dto/create-reservation.entity';
import {
  FindReservationsInput,
  FindReservationsOutput,
} from './dto/find-reservations.dto';
import { MeetingRoomService, ReservationService } from './meeting-room.service';

@Resolver()
export class MeetingRoomResolver {
  constructor(private readonly meetingRoomService: MeetingRoomService) {}
  @Mutation(() => CoreOutput)
  @Role([RoleName.Any])
  async createMeetingRoom(
    @Args('input') createMeetingRoomInput: CreateMeetingRoomInput,
  ): Promise<CoreOutput> {
    return this.meetingRoomService.createMeetingRoom(createMeetingRoomInput);
  }
  @Role([RoleName.Any])
  @Query(() => AllMeetingRoomOutput)
  async allMeetingRoom(): Promise<AllMeetingRoomOutput> {
    return this.meetingRoomService.allMeetingRoom();
  }
}

@Resolver()
export class ReservationResolver {
  constructor(private readonly reservationService: ReservationService) {}

  @Query(() => FindReservationsOutput)
  @Role([RoleName.Any])
  async findReservation(
    @Args('input') findReservationsInput: FindReservationsInput,
  ): Promise<FindReservationsOutput> {
    return this.reservationService.findReservations(findReservationsInput);
  }

  @Mutation(() => CoreOutput)
  @Role([RoleName.Any])
  async createReservation(
    @Args('input') createReservationInput: CreateReservationInput,
  ): Promise<CoreOutput> {
    return this.reservationService.createReservation(createReservationInput);
  }
}
