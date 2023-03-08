import { InputType, OmitType, PartialType } from '@nestjs/graphql';
import { Rest } from '../entity/rest.entity';

@InputType()
export class EditRestInput extends PartialType(
  OmitType(Rest, ['createdAt', 'updatedAt']),
) {}
