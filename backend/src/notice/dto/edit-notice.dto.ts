import { InputType, PartialType, PickType } from '@nestjs/graphql';
import { Notice } from '../entity/notice.entity';

@InputType()
export class EditNoticeInput extends PartialType(
  PickType(Notice, ['id', 'title', 'contents']),
) {}
