import { Field, InputType, PartialType, PickType } from '@nestjs/graphql';
import { IsNumber } from 'class-validator';
import { User } from '../entity/user.entity';

@InputType()
export class EditUserInput extends PartialType(
  PickType(User, [
    'email',
    'password',
    'name',
    'phone',
    'position',
    'birthday',
    'startDate',
  ]),
) {
  @Field(() => Number)
  @IsNumber()
  userId: number;

  @Field(() => String, { nullable: true })
  changePassword?: string;
}
