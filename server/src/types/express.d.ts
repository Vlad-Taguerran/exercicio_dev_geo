import { UserPayload } from "../infrastructure/interfaces/UserPayload";

declare module 'express' {
  interface Request {
    user?: UserPayload;
  }
}