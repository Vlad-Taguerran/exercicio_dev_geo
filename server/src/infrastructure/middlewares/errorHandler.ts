import { Request, Response, NextFunction,ErrorRequestHandler  } from "express";
import { AppError } from "../../application/erros/AppError";
import { logError } from "../config/logHelpers";

export const errorHandler: ErrorRequestHandler = (
  err,
  req,
  res,
  next
):void => {
  if (err instanceof AppError) {
     res.status(err.statusCode).json({
      status: "error",
      message: err.message,
    });
  }

  logError("Unexpected Error:", err);

   res.status(500).json({
    status: "error",
    message: "Internal Server Error",
  });
};