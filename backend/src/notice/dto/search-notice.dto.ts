import { Field, InputType, ObjectType } from '@nestjs/graphql';
import {
  PaginationInput,
  PaginationOutput,
} from 'src/common/dto/pagination.dto';
import { Notice } from '../entity/notice.entity';

@InputType()
export class SearchNoticeInput extends PaginationInput {}

@ObjectType()
export class SearchNoticeOutput extends PaginationOutput {
  @Field(() => [Notice], { nullable: true })
  notices?: Notice[];
}
