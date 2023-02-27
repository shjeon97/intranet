import { SetMetadata } from '@nestjs/common';
import { USER_ROLE_NAMES } from 'src/common/constant';

export const Role = (roles: (keyof typeof USER_ROLE_NAMES)[]) =>
  SetMetadata('role', roles);
