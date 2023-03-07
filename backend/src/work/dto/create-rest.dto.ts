import { InputType, OmitType, PartialType } from '@nestjs/graphql';
import { Rest } from '../entity/rest.entity';

@InputType()
export class CreateRestInput extends PartialType(
  OmitType(Rest, ['id', 'createdAt', 'updatedAt', 'work']),
) {}
