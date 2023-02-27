import { Module } from '@nestjs/common';
import { WorkResolver } from './work.resolver';
import { WorkService } from './work.service';

@Module({
  providers: [WorkResolver, WorkService],
})
export class WorkModule {}
