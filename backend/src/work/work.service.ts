import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  format,
  formatDistanceStrict,
  formatDistanceToNowStrict,
} from 'date-fns';
import { WORK_STATUS_NAMES } from 'src/common/constants';
import { CoreOutput } from 'src/common/dto/output.dto';
import { LogType } from 'src/log/entity/log.entity';
import { LogService } from 'src/log/log.service';
import { User } from 'src/user/entity/user.entity';
import { ILike, In, IsNull, Repository } from 'typeorm';
import { CreateRestInput } from './dto/create-rest.dto';
import { CreateWorkInput } from './dto/create-work.dto';
import { EditRestInput } from './dto/edit-rest.dto';
import { EditWorkInput } from './dto/edit-work.dto';
import { EndWorkInput } from './dto/end-work.dto';
import { FindRestingInput, FindRestingOutput } from './dto/find-resting.dto';
import { FindWorkInput, FindWorkOutput } from './dto/find-work.dto';
import {
  SearchWorkRecordInput,
  SearchWorkRecordOutput,
} from './dto/find-work-record-by-userId.dto';
import { Rest } from './entity/rest.entity';
import { WorkStatus } from './entity/work-status.entity';
import { Work } from './entity/work.entity';
import { EndRestInput } from './dto/end-rest.dto';
import { StartRestInput } from './dto/start-rest.dto';
import { RoleName } from 'src/user/entity/role.entity';

@Injectable()
export class WorkService {
  constructor(
    private readonly logService: LogService,
    @InjectRepository(Work) private readonly workRepository: Repository<Work>,
    @InjectRepository(WorkStatus)
    private readonly workStatusRepository: Repository<WorkStatus>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Rest) private readonly restRepository: Repository<Rest>,
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
  async searchWorkRecord(
    { page, value, type, sort, pageSize }: SearchWorkRecordInput,
    user: User,
  ): Promise<SearchWorkRecordOutput> {
    try {
      const teamNameList = [];
      user.teams.map((team) => {
        teamNameList.push(team.name);
      });

      const [works, totalResult] = await this.workRepository.findAndCount({
        ...(user.roles.find(
          (role) =>
            role.name !== RoleName.Admin &&
            !user.teams.find((team) => team.level >= 2),
        ) && {
          where: {
            userId: user.id,
          },
        }),
        ...(user.roles.find(
          (role) =>
            role.name !== RoleName.Admin && role.name === RoleName.TeamLeader,
        ) && {
          where: {
            user: {
              teams: {
                name: In(teamNameList),
              },
            },
          },
        }),
        ...(type &&
          value && {
            where: { [type]: ILike(`%${value.trim()}%`) },
          }),
        skip: (page - 1) * pageSize,
        take: pageSize,
        order: {
          ...(sort && { [sort]: 'DESC' }),
        },
      });

      if (works.length < 1) {
        return {
          ok: true,
        };
      }

      const rests: Rest[] = [];
      await Promise.all(
        works.map(async (work) => {
          const restList = await this.restRepository.find({
            where: { work: { id: work.id } },
          });
          if (restList.length > 0) {
            restList.forEach((rest) => {
              rests.push(rest);
            });
          }
        }),
      );

      return {
        ok: true,
        works,
        rests,
        totalPage: Math.ceil(totalResult / pageSize),
      };
    } catch (error) {
      console.log(error);

      return {
        ok: false,
        error: '근무 정보 리스트 찾기 실패',
      };
    }
  }

  async createWork(createWorkInput: CreateWorkInput): Promise<CoreOutput> {
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

  async startWork(
    startWorkInput: CreateWorkInput,
    ip: string,
  ): Promise<CoreOutput> {
    try {
      const user = await this.userRepository.findOne({
        where: { id: startWorkInput.userId },
      });
      if (!user) {
        return {
          ok: false,
          error: '존재하지 않는 유저입니다',
        };
      }
      const workStatus = await this.workStatusRepository.findOne({
        where: {
          name: startWorkInput.workStatusName,
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
          ...(workStatus.name === WORK_STATUS_NAMES.InSiteWork &&
          Number(format(new Date(), 'HH')) < 8
            ? {
                startTime: '08:00:00',
              }
            : { startTime: format(new Date(), 'HH:mm:ss') }),
          ...startWorkInput,
          workStatusList: [{ workStatus }],
        }),
      );

      this.logService.create({
        type: LogType.startWork,
        contents: {
          userId: user.id,
          workStatusName: workStatus.name,
          ip,
        },
      });

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

  async endWork(endWorkInput: EndWorkInput): Promise<CoreOutput> {
    try {
      const work = await this.workRepository.findOne({
        where: { user: { id: endWorkInput.userId }, date: endWorkInput.date },
      });

      if (!work) {
        return {
          ok: false,
          error: '존재하지 않는 근무기록 입니다',
        };
      }

      const workMinute = parseInt(
        formatDistanceToNowStrict(
          new Date(`${format(new Date(), 'yyyy MM dd')} ${work.startTime}`),
          { unit: 'minute' },
        ),
      );

      if (workMinute < 540 && work.workStatusName !== WORK_STATUS_NAMES.Late) {
        return {
          ok: false,
          error: '최소 근무시간 미달입니다',
        };
      }

      const rests = await this.restRepository.find({
        where: { work: { id: work.id } },
      });

      if (rests.length > 1) {
        let restMinute = 0;
        rests.map((rest) => {
          restMinute += parseInt(
            formatDistanceStrict(
              new Date(`${format(new Date(), 'yyyy MM dd')} ${rest.startTime}`),
              new Date(`${format(new Date(), 'yyyy MM dd')} ${rest.endTime}`),
              { unit: 'minute' },
            ),
          );
        });
        if (workMinute - restMinute < 540) {
          return {
            ok: false,
            error: '최소 근무시간 미달입니다',
          };
        }
      }

      const workStatus = await this.workStatusRepository.findOne({
        where: {
          name: WORK_STATUS_NAMES.LeaveWork,
        },
      });
      if (!workStatus) {
        return {
          ok: false,
          error: '존재하지 않는 근무유형입니다',
        };
      }
      endWorkInput.workStatus = workStatus;
      endWorkInput.workStatusList = work.workStatusList;
      endWorkInput.workStatusList.push({ workStatus });

      await this.workRepository.save(
        this.workRepository.create({
          id: work.id,
          workStatus,
          endTime: format(new Date(), 'HH:mm:ss'),
          ...endWorkInput,
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
          work,
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

  async startRest(startRestInput: StartRestInput): Promise<CoreOutput> {
    try {
      const work = await this.workRepository.findOne({
        where: {
          id: startRestInput.workId,
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
          work,
          startTime: format(new Date(), 'HH:mm:ss'),
          ...startRestInput,
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

  async findResting({ workId }: FindRestingInput): Promise<FindRestingOutput> {
    try {
      const rest = await this.restRepository.findOne({
        where: { workId: workId, endTime: IsNull() },
      });

      if (!rest) {
        return {
          ok: false,
          error: '휴게중 데이터 미존재',
        };
      }

      return {
        ok: true,
        rest,
      };
    } catch (error) {
      console.log(error);

      return {
        ok: false,
        error: '휴게중 정보 찾기 실패',
      };
    }
  }

  async editRest(editRestInput: EditRestInput): Promise<CoreOutput> {
    try {
      const rest = await this.restRepository.findOne({
        where: { id: editRestInput.id },
      });

      if (!rest) {
        return {
          ok: false,
          error: '존재하지 않는 휴게기록 입니다',
        };
      }

      await this.restRepository.save(
        this.restRepository.create({
          id: rest.id,
          ...editRestInput,
        }),
      );
      return {
        ok: true,
      };
    } catch (error) {
      console.log(error);

      return {
        ok: false,
        error: '휴게 수정 실패',
      };
    }
  }

  async endRest({ id }: EndRestInput): Promise<CoreOutput> {
    try {
      const rest = await this.restRepository.findOne({
        where: { id },
      });

      if (!rest) {
        return {
          ok: false,
          error: '존재하지 않는 휴게기록 입니다',
        };
      }

      const TotalMinute = parseInt(
        formatDistanceToNowStrict(
          new Date(`${format(new Date(), 'yyyy MM dd')} ${rest.startTime}`),
          { unit: 'minute' },
        ),
      );

      await this.restRepository.save(
        this.restRepository.create({
          id: rest.id,
          endTime: format(new Date(), 'HH:mm:ss'),
          totalMinute: TotalMinute,
        }),
      );
      return {
        ok: true,
      };
    } catch (error) {
      console.log(error);

      return {
        ok: false,
        error: '휴게기록 수정 실패',
      };
    }
  }
}
