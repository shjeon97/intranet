import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dto/output.dto';
import { CreateWorkInput } from './dto/create-work.dto';
import { WorkService } from './work.service';

@Resolver()
export class WorkResolver {
  constructor(private workService: WorkService) {}

  @Mutation(() => CoreOutput)
  async createWork(
    @Args('input') createWorkInput: CreateWorkInput,
  ): Promise<CoreOutput> {
    return this.workService.createWork(createWorkInput);
  }
}
