import { InputType, PartialType, PickType } from '@nestjs/graphql';
import { Work } from '../entity/work.entity';

@InputType()
export class StartWorkInput extends PartialType(
  PickType(Work, ['date', 'startTime', 'userId', 'workStatusName', 'memo']),
) {}
