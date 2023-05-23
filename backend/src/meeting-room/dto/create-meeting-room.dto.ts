import { InputType, PickType } from '@nestjs/graphql';
import { MeetingRoom } from '../entity/meeting-room.entity';

@InputType()
export class CreateMeetingRoomInput extends PickType(MeetingRoom, ['name']) {}
