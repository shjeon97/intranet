import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { Page, PageSize } from '../constants';
import { CoreOutput } from './output.dto';

@InputType()
export class PaginationInput {
  @Field(() => Number, { defaultValue: Page })
  page: number;

  @Field(() => Number, { defaultValue: PageSize })
  pageSize: number;

  @Field(() => String, { nullable: true })
  type?: string;

  @Field(() => String, { nullable: true })
  value?: string;

  @Field(() => String, { nullable: true })
  sort?: string;
}

@ObjectType()
export class PaginationOutput extends CoreOutput {
  @Field(() => Number, { nullable: true })
  totalPage?: number;

  @Field(() => Number, { nullable: true })
  totalResult?: number;

  @Field(() => String, { nullable: true })
  type?: string;

  @Field(() => String, { nullable: true })
  value?: string;

  @Field(() => String, { nullable: true })
  sort?: string;
}
