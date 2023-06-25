import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';
import { LoginInput, LoginOutput } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import { UserStatus } from 'src/user/entity/user.entity';
import { LogService } from 'src/log/log.service';
import { LogType } from 'src/log/entity/log.entity';

@Resolver()
export class AuthResolver {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
    private readonly logService: LogService,
  ) {}

  @Mutation(() => LoginOutput)
  async login(
    @Context() content: any,
    @Args('input') { email, password }: LoginInput,
  ): Promise<LoginOutput> {
    try {
      const user = await this.userService.findOneByEmail(email, true);

      if (!user || !(await bcrypt.compare(password, user.password))) {
        return {
          ok: false,
          error: 'ID 또는 비밀번호가 일치하지 않습니다.',
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
            error: 'ID 또는 비밀번호가 일치하지 않습니다.',
          };
      }

      const token = await this.authService.getAccessToken(user);

      if (!token) {
        return {
          ok: false,
          error: 'token 생성 실패',
        };
      }

      this.logService.create({
        type: LogType.Login,
        contents: {
          userId: user.id,
          ip: content.clientIp,
        },
      });

      return {
        ok: true,
        token: token,
      };
    } catch (error) {
      return {
        ok: false,
        error: '로그인 실패',
      };
    }
  }
}
