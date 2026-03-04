import { Session } from "next-auth";
import { ReactNode } from "react";

export interface IAuthProviderProps {
  children: ReactNode;
  session?: Session | null;
  refetchInterval?: number;
  basePath?: string;
}