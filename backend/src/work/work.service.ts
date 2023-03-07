import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { WORK_STATUS_NAMES } from 'src/common/constant';
import { CoreOutput } from 'src/common/dto/output.dto';
import { LogType } from 'src/log/entity/log.entity';
import { LogService } from 'src/log/log.service';
import { User } from 'src/user/entity/user.entity';
import { Repository } from 'typeorm';
import { CreateRestInput } from './dto/create-rest.dto';
import { CreateWorkInput } from './dto/create-work.dto';
import { EditWorkInput } from './dto/edit-work.dto';
import { FindWorkInput, FindWorkOutput } from './dto/find-work.dto';
import { Rest } from './entity/rest.entity';
import { WorkStatus } from './entity/work-status.entity';
import { Work } from './entity/work.entity';

@Injectable()
export class WorkService {
  constructor(
    private readonly logService: LogService,
    @InjectRepository(Work) private readonly workRepository: Repository<Work>,
    @InjectRepository(WorkStatus)
    private readonly workStatusRepository: Repository<WorkStatus>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findWork({ userId, date }: FindWorkInput): Promise<FindWorkOutput> {
    try {
      const work = await this.workRepository.findOne({
        where: {
          userId,
          date,
        },
      });
      return {
        ok: true,
        work,
      };
    } catch (error) {
      console.log(error);

      return {
        ok: false,
        error: '근무 정보 찾기 실패',
      };
    }
  }

  async createWork(
    createWorkInput: CreateWorkInput,
    ip: string,
  ): Promise<CoreOutput> {
    try {
      const user = await this.userRepository.findOne({
        where: { id: createWorkInput.userId },
      });
      if (!user) {
        return {
          ok: false,
          error: '존재하지 않는 유저입니다',
        };
      }
      const workStatus = await this.workStatusRepository.findOne({
        where: {
          name: createWorkInput.workStatusName,
        },
      });
      if (!workStatus) {
        return {
          ok: false,
          error: '존재하지 않는 근무유형입니다',
        };
      }
      await this.workRepository.save(
        this.workRepository.create({
          user,
          workStatus,
          ...createWorkInput,
          workStatusList: [{ workStatus }],
        }),
      );

      if (
        workStatus.name === WORK_STATUS_NAMES.InSiteWork ||
        workStatus.name === WORK_STATUS_NAMES.OnSiteWork ||
        workStatus.name === WORK_STATUS_NAMES.Late
      ) {
        this.logService.create({
          type: LogType.startWork,
          contents: {
            userId: user.id,
            workStatusName: workStatus.name,
            ip,
          },
        });
      }

      return {
        ok: true,
      };
    } catch (error) {
      console.log(error);

      return {
        ok: false,
        error: '근무 일정 생성 실패',
      };
    }
  }

  async editWork(editWorkInput: EditWorkInput): Promise<CoreOutput> {
    try {
      const work = await this.workRepository.findOne({
        where: { user: { id: editWorkInput.userId }, date: editWorkInput.date },
      });

      if (!work) {
        return {
          ok: false,
          error: '존재하지 않는 근무기록 입니다',
        };
      }

      if (editWorkInput.workStatusName) {
        const workStatus = await this.workStatusRepository.findOne({
          where: {
            name: editWorkInput.workStatusName,
          },
        });
        if (!workStatus) {
          return {
            ok: false,
            error: '존재하지 않는 근무유형입니다',
          };
        }
        editWorkInput.workStatus = workStatus;
        editWorkInput.workStatusList = work.workStatusList;
        editWorkInput.workStatusList.push({ workStatus });
      }

      await this.workRepository.save(
        this.workRepository.create({
          id: work.id,
          ...editWorkInput,
        }),
      );
      return {
        ok: true,
      };
    } catch (error) {
      console.log(error);

      return {
        ok: false,
        error: '근무 일정 수정 실패',
      };
    }
  }
}

@Injectable()
export class RestService {
  constructor(
    private readonly logService: LogService,
    @InjectRepository(Work) private readonly workRepository: Repository<Work>,
    @InjectRepository(Rest) private readonly restRepository: Repository<Rest>,
  ) {}

  async createRest(createRestInput: CreateRestInput): Promise<CoreOutput> {
    try {
      const work = await this.workRepository.findOne({
        where: {
          id: createRestInput.workId,
        },
      });
      if (!work) {
        return {
          ok: false,
          error: '존재하지 않는 근무기록입니다',
        };
      }
      await this.restRepository.save(
        this.restRepository.create({
          ...createRestInput,
        }),
      );

      return {
        ok: true,
      };
    } catch (error) {
      console.log(error);

      return {
        ok: false,
        error: '휴게 생성 실패',
      };
    }
  }
}
