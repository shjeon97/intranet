import { InputType, PartialType, PickType } from '@nestjs/graphql';
import { Work } from '../entity/work.entity';

@InputType()
export class EndWorkInput extends PartialType(
  PickType(Work, ['userId', 'date', 'overtimeReason']),
) {}
