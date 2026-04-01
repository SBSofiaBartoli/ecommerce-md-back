import { Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        const date = new Date().toISOString();
        console.log(`Running method ${req.method} on url ${req.originalUrl} at this time ${date}`);
        next();
    }
}
