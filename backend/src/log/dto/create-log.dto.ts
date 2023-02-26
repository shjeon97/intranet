import { InputType, PickType } from '@nestjs/graphql';
import { Log } from '../entity/log.entity';

@InputType()
export class CreateLogInput extends PickType(Log, ['type', 'contents']) {}
