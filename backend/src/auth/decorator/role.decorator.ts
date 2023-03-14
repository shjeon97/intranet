import { SetMetadata } from '@nestjs/common';
import { RoleName } from 'src/user/entity/role.entity';

export const Role = (roles: (keyof typeof RoleName)[]) =>
  SetMetadata('role', roles);
