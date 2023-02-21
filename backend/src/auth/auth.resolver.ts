import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';
import { LoginInput, LoginOutput } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import { UserStatus } from 'src/user/entity/user.entity';

@Resolver()
export class AuthResolver {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}
  @Mutation(() => LoginOutput)
  async login(
    @Args('input') { email, password }: LoginInput,
  ): Promise<LoginOutput> {
    const user = await this.userService.findOneByEmail(email, true);

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return {
        ok: false,
        error: '존재하지 않는 유저입니다',
      };
    }

    switch (user.status) {
      case UserStatus.Unapproved:
        return {
          ok: false,
          error: '관리자 승인 후 로그인 가능합니다',
        };
      case UserStatus.Resignation:
        return {
          ok: false,
          error: '존재하지 않는 유저입니다',
        };
    }

    const token = await this.authService.getAccessToken(user);

    if (!token) {
      return {
        ok: false,
        error: 'token 생성 실패',
      };
    }

    return {
      ok: true,
      token: token,
    };
  }
}
