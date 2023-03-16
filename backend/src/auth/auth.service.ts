import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/entity/user.entity';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async getAccessToken(user: User): Promise<string | null> {
    return this.jwtService.sign(
      { id: user.id },
      { secret: process.env.PRIVATE_KEY },
    );
  }
}
