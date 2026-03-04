import type { IApplication } from './application.types';

export type UserRoleType = 'User' | 'Admin';

export interface IUser {
  id: string;
  name?: string;
  email?: string;
  emailVerified?: Date;
  image?: string;
  applications?: IApplication[];
}
