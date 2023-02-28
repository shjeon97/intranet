import { Resolver } from '@nestjs/graphql';
import { WorkService } from './work.service';

@Resolver()
export class WorkResolver {
  constructor(private workService: WorkService) {}
}
