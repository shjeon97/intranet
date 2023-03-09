import { Field, InputType, ObjectType } from '@nestjs/graphql';
import {
  PaginationInput,
  PaginationOutput,
} from 'src/common/dto/pagination.dto';
import { Rest } from '../entity/rest.entity';
import { Work } from '../entity/work.entity';

@InputType()
export class FindWorkRecordByUserIdInput extends PaginationInput {
  @Field(() => Number)
  userId: number;
}

@ObjectType()
export class FindWorkRecordByUserIdOutput extends PaginationOutput {
  @Field(() => [Work], { nullable: true })
  works?: Work[];

  @Field(() => [Rest], { nullable: true })
  rests?: Rest[];
}
