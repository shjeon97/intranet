import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthUser } from 'src/auth/decorator/auth-user.decorator';
import { Role } from 'src/auth/decorator/role.decorator';
import { USER_ROLE_NAMES } from 'src/common/constant';
import { CoreOutput } from 'src/common/dto/output.dto';
import { CreateUserInput } from './dto/create-user.dto';
import { EditUserInput } from './dto/edit-user.dto';
import { GetUserInput, GetUserOutput } from './dto/get-user.dto';
import { GetUsersOutput } from './dto/get-users.dto';
import { User } from './entity/user.entity';
import { UserService } from './user.service';

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Role([USER_ROLE_NAMES.Any])
  @Query(() => User)
  async me(@AuthUser() user: User): Promise<User> {
    return user;
  }

  @Role([USER_ROLE_NAMES.Any])
  @Query(() => GetUsersOutput)
  async getUsers(): Promise<GetUsersOutput> {
    return this.userService.getUsers();
  }

  @Role([USER_ROLE_NAMES.Admin])
  @Query(() => GetUserOutput)
  async getUser(@Args('input') { id }: GetUserInput): Promise<GetUserOutput> {
    return this.userService.getUser({ id });
  }

  @Mutation(() => CoreOutput)
  async createUser(
    @Args('input') createUserInput: CreateUserInput,
  ): Promise<CoreOutput> {
    return this.userService.createUser(createUserInput);
  }

  @Role([USER_ROLE_NAMES.Any])
  @Mutation(() => CoreOutput)
  async editUser(
    @AuthUser() user: User,
    @Args('input') editUserInput: EditUserInput,
  ): Promise<CoreOutput> {
    return this.userService.editUser(user, editUserInput);
  }
}
