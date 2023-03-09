import { InputType, PartialType, PickType } from '@nestjs/graphql';
import { Rest } from '../entity/rest.entity';

@InputType()
export class EndRestInput extends PartialType(PickType(Rest, ['id'])) {}
