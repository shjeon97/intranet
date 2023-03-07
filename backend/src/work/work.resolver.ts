import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dto/output.dto';
import { CreateRestInput } from './dto/create-rest.dto';
import { CreateWorkInput } from './dto/create-work.dto';
import { EditWorkInput } from './dto/edit-work.dto';
import { FindWorkInput, FindWorkOutput } from './dto/find-work.dto';
import { RestService, WorkService } from './work.service';

@Resolver()
export class WorkResolver {
  constructor(private workService: WorkService) {}

  @Query(() => FindWorkOutput)
  async findWork(
    @Args('input') findWorkInput: FindWorkInput,
  ): Promise<FindWorkOutput> {
    return this.workService.findWork(findWorkInput);
  }

  @Mutation(() => CoreOutput)
  async createWork(
    @Context() content: any,
    @Args('input') createWorkInput: CreateWorkInput,
  ): Promise<CoreOutput> {
    return this.workService.createWork(createWorkInput, content.clientIp);
  }

  @Mutation(() => CoreOutput)
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
  async createRest(
    @Args('input') createRestInput: CreateRestInput,
  ): Promise<CoreOutput> {
    return this.restService.createRest(createRestInput);
  }
}
