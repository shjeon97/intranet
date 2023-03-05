import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dto/output.dto';
import { Work } from '../entity/work.entity';

@InputType()
export class FindWorkInput extends PickType(Work, ['userId', 'date']) {}

@ObjectType()
export class FindWorkOutput extends CoreOutput {
  @Field(() => Work, { nullable: true })
  work?: Work;
}
