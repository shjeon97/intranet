import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Log } from './entity/log.entity';
import { LogResolver } from './log.resolver';
import { LogService } from './log.service';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([Log])],
  providers: [LogResolver, LogService],
  exports: [LogService],
})
export class LogModule {}
