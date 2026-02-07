import { CanActivate, ExecutionContext, ForbiddenException, Injectable, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";
import { AuthService } from "src/services/auth.service";

@Injectable()
export class AuthGuards implements CanActivate{
    constructor(private reflector: Reflector, private authService: AuthService){}
    async canActivate(context: ExecutionContext): Promise<boolean>{
        const req = context.switchToHttp().getRequest()
        const [type, token] = (req.headers.authorization || '').split(' ') // type token
        if (type !== 'Bearer' || !token) {
            throw new UnauthorizedException('token tidak ada atau format salah');
        }
        req.user = await this.authService.verifyToken(token).catch(() => {
            throw new UnauthorizedException('token tidak valid')
        })
        // mengecek role user
        const allowRole = this.reflector.get<('admin' | 'user')[]>('roles', context.getHandler()) || [];
        if (allowRole.length > 0 && !allowRole.includes(req.user.role)) {
            throw new ForbiddenException('akses hanya untuk user tertentu')
        }
        return true
    }
}