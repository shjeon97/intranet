import { InputType, OmitType, PartialType } from '@nestjs/graphql';
import { Work } from '../entity/work.entity';

@InputType()
export class EditWorkInput extends PartialType(
  OmitType(Work, ['id', 'createdAt', 'updatedAt']),
) {}
