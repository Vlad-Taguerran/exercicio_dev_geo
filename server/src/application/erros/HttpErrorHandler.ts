
import { ValidationError } from "sequelize";
import { NotFoundError } from "./NotFoundError";
import { UnauthorizedError } from "./UnauthorizedError";
import { Response } from 'express';
import { InfrastructureError } from "./InfrastructureError";
export function handleHttpError(error: any, res: Response) {
  if (error instanceof NotFoundError) {
    return res.status(404).json({ error: error.message });
  }
  if (error instanceof UnauthorizedError) {
    return res.status(403).json({ error: error.message });
  }
  if (error instanceof ValidationError) {
    return res.status(400).json({ error: error.message });
  }
  if(error instanceof InfrastructureError){
    return res.status(500).json({ error: "Erro no servidor" });
  }
  return res.status(500).json({ error: "Erro no servidor" });
}
