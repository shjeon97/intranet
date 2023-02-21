import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dto/output.dto';
import { User } from '../entity/user.entity';

@InputType()
export class GetUserInput extends PickType(User, ['id']) {}

@ObjectType()
export class GetUserOutput extends CoreOutput {
  @Field(() => User, { nullable: true })
  user?: User;
}
