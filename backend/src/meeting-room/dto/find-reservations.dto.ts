import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dto/output.dto';
import { Reservation } from '../entity/reservation.entity';

@InputType()
export class FindReservationsInput extends PickType(Reservation, ['date']) {}

@ObjectType()
export class FindReservationsOutput extends CoreOutput {
  @Field(() => [Reservation], { nullable: true })
  reservations?: Reservation[];
}
