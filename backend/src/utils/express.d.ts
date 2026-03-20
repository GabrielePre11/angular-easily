import { Role } from "./auth/generateToken";

declare global {
  namespace Express {
    interface Request {
      cookies: Record<string, string>;
      user?: {
        id: string;
        role: Role;
      };
    }
  }
}

export {};
