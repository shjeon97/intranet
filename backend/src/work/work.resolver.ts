import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Role } from 'src/auth/decorator/role.decorator';
import { USER_ROLE_NAMES } from 'src/common/constants';
import { CoreOutput } from 'src/common/dto/output.dto';
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
import { RestService, WorkService } from './work.service';
import { EndRestInput } from './dto/end-rest.dto';
import { StartRestInput } from './dto/start-rest.dto';
import { StartWorkInput } from './dto/start-work.dto';
import { AuthUser } from 'src/auth/decorator/auth-user.decorator';
import { User } from 'src/user/entity/user.entity';

@Resolver()
export class WorkResolver {
  constructor(private workService: WorkService) {}

  @Query(() => FindWorkOutput)
  @Role([USER_ROLE_NAMES.Any])
  async findWork(
    @Args('input') findWorkInput: FindWorkInput,
  ): Promise<FindWorkOutput> {
    return this.workService.findWork(findWorkInput);
  }

  @Query(() => SearchWorkRecordOutput)
  @Role([USER_ROLE_NAMES.Any])
  async searchWorkRecord(
    @AuthUser() user: User,
    @Args('input') searchWorkRecordInput: SearchWorkRecordInput,
  ): Promise<SearchWorkRecordOutput> {
    return this.workService.searchWorkRecord(searchWorkRecordInput, user);
  }

  @Mutation(() => CoreOutput)
  @Role([USER_ROLE_NAMES.Any])
  async createWork(
    @Args('input') createWorkInput: CreateWorkInput,
  ): Promise<CoreOutput> {
    return this.workService.createWork(createWorkInput);
  }

  @Mutation(() => CoreOutput)
  @Role([USER_ROLE_NAMES.Any])
  async startWork(
    @Context() content: any,
    @Args('input') startWorkInput: StartWorkInput,
  ): Promise<CoreOutput> {
    return this.workService.startWork(startWorkInput, content.clientIp);
  }

  @Mutation(() => CoreOutput)
  @Role([USER_ROLE_NAMES.Any])
  async endWork(
    @Args('input') endWorkInput: EndWorkInput,
  ): Promise<CoreOutput> {
    return this.workService.endWork(endWorkInput);
  }

  @Mutation(() => CoreOutput)
  @Role([USER_ROLE_NAMES.Any])
  async editWork(
    @Args('input') editWorkInput: EditWorkInput,
  ): Promise<CoreOutput> {
    return this.workService.editWork(editWorkInput);
  }
}

@Resolver()
export class RestResolver {
  constructor(private restService: RestService) {}

  @Mutation(() => CoreOutput)
  @Role([USER_ROLE_NAMES.Any])
  async createRest(
    @Args('input') createRestInput: CreateRestInput,
  ): Promise<CoreOutput> {
    return this.restService.createRest(createRestInput);
  }

  @Mutation(() => CoreOutput)
  @Role([USER_ROLE_NAMES.Any])
  async startRest(
    @Args('input') startRestInput: StartRestInput,
  ): Promise<CoreOutput> {
    return this.restService.startRest(startRestInput);
  }

  @Query(() => FindRestingOutput)
  @Role([USER_ROLE_NAMES.Any])
  async findResting(
    @Args('input') findRestingInput: FindRestingInput,
  ): Promise<FindRestingOutput> {
    return this.restService.findResting(findRestingInput);
  }

  @Mutation(() => CoreOutput)
  @Role([USER_ROLE_NAMES.Any])
  async editRest(
    @Args('input') editRestInput: EditRestInput,
  ): Promise<CoreOutput> {
    return this.restService.editRest(editRestInput);
  }

  @Mutation(() => CoreOutput)
  @Role([USER_ROLE_NAMES.Any])
  async endRest(
    @Args('input') endRestInput: EndRestInput,
  ): Promise<CoreOutput> {
    return this.restService.endRest(endRestInput);
  }
}
