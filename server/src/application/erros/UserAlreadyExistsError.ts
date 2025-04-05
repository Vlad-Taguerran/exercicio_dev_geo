import { ConflictError } from "./ConflictError";

export class UserAlreadyExistsError extends ConflictError {
  constructor(message = "User already exists") {
    super(message);
  }
}