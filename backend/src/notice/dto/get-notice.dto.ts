import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dto/output.dto';
import { Notice } from '../entity/notice.entity';

@InputType()
export class GetNoticeInput extends PickType(Notice, ['id']) {}

@ObjectType()
export class GetNoticeOutput extends CoreOutput {
  @Field(() => Notice, { nullable: true })
  notice?: Notice;
}
