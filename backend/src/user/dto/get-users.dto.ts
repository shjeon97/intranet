import { Field, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dto/output.dto';
import { User } from '../entity/user.entity';

@ObjectType()
export class GetUsersOutput extends CoreOutput {
  @Field(() => [User], { nullable: true })
  users?: User[];
}
