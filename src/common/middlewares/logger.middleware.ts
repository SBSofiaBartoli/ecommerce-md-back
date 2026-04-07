import { Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction): void {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] ${req.method} ${req.originalUrl}`);
    next();
  }
}
