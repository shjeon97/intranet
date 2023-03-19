import { InputType, PickType } from '@nestjs/graphql';
import { Notice } from '../entity/notice.entity';

@InputType()
export class CreateNoticeInput extends PickType(Notice, [
  'status',
  'title',
  'contents',
]) {}
