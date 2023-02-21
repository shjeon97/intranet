import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entity/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private readonly jwtService: JwtService,
    @InjectRepository(User)
    private readonly user: Repository<User>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = this.reflector.get<string[]>('role', context.getHandler());
    if (!roles) {
      return true;
    }

    const gqlContext = GqlExecutionContext.create(context).getContext();
    const token = gqlContext.token;

    if (token) {
      // 토큰 복호화 설정
      const decoded = this.jwtService.verify(token.toString(), {
        secret: process.env.PRIVATE_KEY,
      });
      // 토큰 복호화하여 id 값 가져오기
      if (typeof decoded === 'object' && decoded.hasOwnProperty('id')) {
        const user = await this.user.findOne({
          where: { id: decoded['id'] },
        });
        if (user) {
          gqlContext['user'] = user;
          if (roles.includes('Any')) {
            return true;
          }

          roles.map((role) => {
            if (user.roles.find((e) => e.name === role)) {
              return true;
            }
          });

          return false;
        }
      }
    }
    return false;
  }
}
