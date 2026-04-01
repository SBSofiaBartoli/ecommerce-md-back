import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Observable } from "rxjs";
import { Rol } from "../enum/roles.enum";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor (private readonly jwtService: JwtService) {}

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest();
        
        const authorization = request.headers.authorization;
        if (!authorization) throw new UnauthorizedException('Missing Authorization header');

        const token = authorization.split(' ')[1];
        if (!token) throw new UnauthorizedException('Missing token');
        

        const secret = process.env.JWT_SECRET;

        try {
            const user = this.jwtService.verify(token, { secret });
            user.iat = new Date(user.iat * 1000).toLocaleString();
            user.exp = new Date(user.exp * 1000).toLocaleString();
            if(user.isAdmin === 'Admin'){
                user.roles = [Rol.Admin];
            } else if(user.isAdmin === 'SuperAdmin') {
                user.roles = [Rol.SuperAdmin];
            } else {
                user.roles = [Rol.User];
            }
            request.user = user;
            return true;
        } catch (error) {
            throw new UnauthorizedException('Invalid or expired token');
        }
    }
}
