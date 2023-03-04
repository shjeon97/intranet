import { InputType, OmitType, PartialType } from '@nestjs/graphql';
import { Work } from '../entity/work.entity';

@InputType()
export class CreateWorkInput extends PartialType(
  OmitType(Work, ['id', 'createdAt', 'updatedAt', 'workStatus', 'user']),
) {}
