/* eslint-disable @typescript-eslint/no-redeclare */
export const LOCAL_STORAGE_TOKEN = "intranet-jwt";

export const USER_ROLE_NAMES = {
  Any: "Any",
  Admin: "Admin",
} as const;
type USER_ROLE_NAMES = typeof USER_ROLE_NAMES[keyof typeof USER_ROLE_NAMES];

export const WORK_STATUS_NAMES = {
  InSiteWork: "정상출근",
  OnSiteWork: "현장출근",
  Late: "지각",
  LeaveWork: "퇴근",
} as const;
type WORK_STATUS_NAMES =
  typeof WORK_STATUS_NAMES[keyof typeof WORK_STATUS_NAMES];

// 기본 게시물 페이지 번호
export const Page = 1;
// 기본 게시물 개수
export const PageSize = 15;
