export const USER_ROLE_NAMES = {
  Any: 'Any',
  Admin: 'Admin',
} as const;
type USER_ROLE_NAMES = (typeof USER_ROLE_NAMES)[keyof typeof USER_ROLE_NAMES];

export const WORK_STATUS_NAMES = {
  InSiteWork: '정상출근',
  OnSiteWork: '현장출근',
  Late: '지각',
} as const;
type WORK_STATUS_NAMES =
  (typeof WORK_STATUS_NAMES)[keyof typeof WORK_STATUS_NAMES];
