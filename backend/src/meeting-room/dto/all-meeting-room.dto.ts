import { Field, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dto/output.dto';
import { MeetingRoom } from '../entity/meeting-room.entity';

@ObjectType()
export class AllMeetingRoomOutput extends CoreOutput {
  @Field(() => [MeetingRoom], { nullable: true })
  meetingRooms?: MeetingRoom[];
}
