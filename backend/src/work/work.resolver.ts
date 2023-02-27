import { Mutation, Resolver } from '@nestjs/graphql';
import { WorkService } from './work.service';

@Resolver()
export class WorkResolver {
  constructor(private workService: WorkService) {}

  //   @Mutation(() => CoreOutput)
  //   async createUser(
  //     @Args('input') createUserInput: CreateUserInput,
  //   ): Promise<CoreOutput> {
  //     return this.userService.createUser(createUserInput);
  //   }
}
