import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dto/output.dto';
import { Rest } from '../entity/rest.entity';

@InputType()
export class FindRestingInput extends PickType(Rest, ['workId']) {}

@ObjectType()
export class FindRestingOutput extends CoreOutput {
  @Field(() => Rest, { nullable: true })
  rest?: Rest;
}
