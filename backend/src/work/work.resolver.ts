import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Role } from 'src/auth/decorator/role.decorator';
import { USER_ROLE_NAMES } from 'src/common/constant';
import { CoreOutput } from 'src/common/dto/output.dto';
import { CreateRestInput } from './dto/create-rest.dto';
import { CreateWorkInput } from './dto/create-work.dto';
import { EditRestInput } from './dto/edit-rest.dto';
import { EditWorkInput } from './dto/edit-work.dto';
import { EndWorkInput } from './dto/end-work.dto';
import { FindRestingInput, FindRestingOutput } from './dto/find-resting.dto';
import { FindWorkInput, FindWorkOutput } from './dto/find-work.dto';
import {
  FindWorkRecordByUserIdInput,
  FindWorkRecordByUserIdOutput,
} from './dto/find-work-record-by-userId.dto';
import { RestService, WorkService } from './work.service';
import { EndRestInput } from './dto/end-rest.dto';

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

  @Query(() => FindWorkRecordByUserIdOutput)
  @Role([USER_ROLE_NAMES.Any])
  async findWorkRecordByUserId(
    @Args('input') findWorkRecordByUserIdInput: FindWorkRecordByUserIdInput,
  ): Promise<FindWorkRecordByUserIdOutput> {
    return this.workService.findWorkRecordByUserId(findWorkRecordByUserIdInput);
  }

  @Mutation(() => CoreOutput)
  @Role([USER_ROLE_NAMES.Any])
  async createWork(
    @Context() content: any,
    @Args('input') createWorkInput: CreateWorkInput,
  ): Promise<CoreOutput> {
    return this.workService.createWork(createWorkInput, content.clientIp);
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
