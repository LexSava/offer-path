import type { IApplication } from './application.interfaces';

export interface IUser {
  id: string;
  name?: string;
  email?: string;
  emailVerified?: Date;
  image?: string;
  applications?: IApplication[];
}
