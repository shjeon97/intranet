import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entity/user.entity';
import { WorkStatus } from './entity/work-status.entity';
import { Work } from './entity/work.entity';
import { WorkResolver } from './work.resolver';
import { WorkService } from './work.service';

@Module({
  imports: [TypeOrmModule.forFeature([Work, WorkStatus, User])],
  providers: [WorkResolver, WorkService],
})
export class WorkModule {}
