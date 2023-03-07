import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entity/user.entity';
import { Rest } from './entity/rest.entity';
import { WorkStatus } from './entity/work-status.entity';
import { Work } from './entity/work.entity';
import { RestResolver, WorkResolver } from './work.resolver';
import { RestService, WorkService } from './work.service';

@Module({
  imports: [TypeOrmModule.forFeature([Work, WorkStatus, User, Rest])],
  providers: [WorkResolver, RestResolver, WorkService, RestService],
})
export class WorkModule {}
