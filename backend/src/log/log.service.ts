import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CoreOutput } from 'src/common/dto/output.dto';
import { Repository } from 'typeorm';
import { CreateLogInput } from './dto/create-log.dto';
import { Log } from './entity/log.entity';

@Injectable()
export class LogService {
  constructor(
    @InjectRepository(Log)
    private readonly logRepository: Repository<Log>,
  ) {}

  async create({ type, contents }: CreateLogInput): Promise<CoreOutput> {
    try {
      await this.logRepository.save(
        this.logRepository.create({
          type,
          contents,
        }),
      );
      return {
        ok: true,
      };
    } catch (error) {
      return {
        ok: false,
        error: '로그 생성 실패',
      };
    }
  }
}
