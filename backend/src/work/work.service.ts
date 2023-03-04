import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CoreOutput } from 'src/common/dto/output.dto';
import { Repository } from 'typeorm';
import { CreateWorkInput } from './dto/create-work.dto';
import { WorkStatus } from './entity/work-status.entity';
import { Work } from './entity/work.entity';

@Injectable()
export class WorkService {
  constructor(
    @InjectRepository(Work) private readonly workRepository: Repository<Work>,
    @InjectRepository(WorkStatus)
    private readonly workStatusRepository: Repository<WorkStatus>,
  ) {}

  async createWork(createWorkInput: CreateWorkInput): Promise<CoreOutput> {
    try {
      console.log(createWorkInput);

      // await this.workRepository.save(
      //   this.workRepository.create({
      //     ...createWorkInput,
      //   }),
      // );
      return {
        ok: true,
      };
    } catch (error) {
      return {
        ok: false,
        error: '근무 일정 생성 실패',
      };
    }
  }
}
