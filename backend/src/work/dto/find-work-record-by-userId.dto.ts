import { Field, InputType, ObjectType } from '@nestjs/graphql';
import {
  PaginationInput,
  PaginationOutput,
} from 'src/common/dto/pagination.dto';
import { Rest } from '../entity/rest.entity';
import { Work } from '../entity/work.entity';

@InputType()
export class SearchWorkRecordInput extends PaginationInput {}

@ObjectType()
export class SearchWorkRecordOutput extends PaginationOutput {
  @Field(() => [Work], { nullable: true })
  works?: Work[];

  @Field(() => [Rest], { nullable: true })
  rests?: Rest[];
}
