import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CoreOutput } from 'src/common/dto/output.dto';
import { Repository } from 'typeorm';
import { CreateUserInput } from './dto/create-user.dto';
import { EditUserInput } from './dto/edit-user.dto';
import { GetUserInput } from './dto/get-user.dto';
import { GetUsersOutput } from './dto/get-users.dto';
import { User } from './entity/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}
  private readonly logger = new Logger();

  async findOneByEmail(
    email: string,
    isGetPassword = false,
  ): Promise<User | null> {
    return await this.userRepository.findOne({
      where: { email: email.trim() },
      ...(isGetPassword && {
        select: ['id', 'password', 'status'],
      }),
    });
  }

  async createUser({
    email,
    position,
    password,
    name,
    phone,
    birthday,
    startDate,
  }: CreateUserInput): Promise<CoreOutput> {
    try {
      const existUser = await this.findOneByEmail(email);
      if (existUser) {
        return {
          ok: false,
          error: '존재하는 이메일입니다.',
        };
      }

      const exist = await this.userRepository.findOne({
        where: { phone: phone.trim() },
      });
      if (exist) {
        return {
          ok: false,
          error: '존재하는 전화번호입니다.',
        };
      }
      await this.userRepository.save(
        this.userRepository.create({
          email: email.trim(),
          position: position.trim(),
          password: password.trim(),
          name: name.trim(),
          phone: phone.trim(),
          birthday,
          startDate,
        }),
      );

      return {
        ok: true,
      };
    } catch (error) {
      this.logger.error(error);
      return {
        ok: false,
        error: '유저 생성 실패',
      };
    }
  }

  async getUsers(): Promise<GetUsersOutput> {
    try {
      const users = await this.userRepository.find();
      return {
        ok: true,
        users,
      };
    } catch (error) {
      this.logger.error(error);
      return {
        ok: false,
        error: '모든 유저 가져오기 실패',
      };
    }
  }
  async getUser({ id }: GetUserInput): Promise<GetUsersOutput> {
    try {
      const user = await this.userRepository.find({ where: { id } });
      return {
        ok: true,
        users: user,
      };
    } catch (error) {
      this.logger.error(error);
      return {
        ok: false,
        error: '유저 가져오기 실패',
      };
    }
  }

  async editUser(
    user: User,
    editUserInput: EditUserInput,
  ): Promise<CoreOutput> {
    try {
      if (
        !user.roles.find((role) => role.name === 'Admin') &&
        user.id !== editUserInput.userId
      ) {
        return {
          ok: false,
          error: '유저 변경 권한이 없습니다',
        };
      }
      const exist = await this.userRepository.findOne({
        where: { id: editUserInput.userId },
        select: ['id', 'password'],
      });
      if (!exist) {
        return {
          ok: false,
          error: '존재하지 않은 유저입니다',
        };
      }

      if (!(await bcrypt.compare(editUserInput.password, exist.password))) {
        return {
          ok: false,
          error: '잘못된 비밀번호 입니다',
        };
      }

      if (editUserInput.changePassword) {
        editUserInput.password = editUserInput.changePassword;
      } else {
        delete editUserInput.password;
      }
      await this.userRepository.save(
        this.userRepository.create({ id: user.id, ...editUserInput }),
      );
      return {
        ok: true,
      };
    } catch (error) {
      return { ok: false, error: '유저 업데이트 실패' };
    }
  }
}
