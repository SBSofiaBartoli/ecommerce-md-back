import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Observable } from "rxjs";
import { Rol } from "../enum/roles.enum";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();

    const authorization = request.headers.authorization;
    if (!authorization)
      throw new UnauthorizedException("Missing Authorization header");

    const [scheme, token] = authorization.split(" ")[1];
    if (scheme !== "Bearer" || !token)
      throw new UnauthorizedException(
        "Invalid Authorization format. Expected: Bearer <token>",
      );

    try {
      const payload = this.jwtService.verify(token, {
        secret: process.env.JWT_SECRET,
      });
      if (payload.isAdmin === Rol.SuperAdmin) {
        payload.roles = [Rol.SuperAdmin, Rol.Admin, Rol.User];
      } else if (payload.isAdmin === Rol.Admin) {
        payload.roles = [Rol.Admin, Rol.User];
      } else {
        payload.roles = [Rol.User];
      }

      payload.iat = new Date(payload.iat * 1000).toISOString();
      payload.exp = new Date(payload.exp * 1000).toISOString();
      request.user = payload;
      return true;
    } catch (error) {
      throw new UnauthorizedException("Invalid or expired token");
    }
  }
}
