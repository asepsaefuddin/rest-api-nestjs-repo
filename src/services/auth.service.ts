import { Injectable, InternalServerErrorException, UnauthorizedException } from "@nestjs/common";
import { UserService } from "./user.service";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService{
    constructor(private users: UserService, private jwt: JwtService){}
    // register
    async register(email: string, username: string, password: string, role?: 'admin' | 'user'){
        const user = await this.users.create(email, username, password, role ?? 'user');
        return {
            id: user.id,
            email: user.email,
            username: user.username,
            role: user.role
        }
    }
    // login
    async login(email: string, password: string){
        const user = await this.users.validationUser(email, password);
        if (!user) {
            throw new UnauthorizedException('email/password salah')
        }
        if (!user.email || !user.username || !user.password || !user.role) {
            throw new InternalServerErrorException('user data tidak ada')
        }
        const payload = {sub: user.id, email: user.email, username: user.username, role: user.role}
        return {
            access_token: await this.jwt.signAsync(payload),
            user: {id: user.id, email: user.email, username: user.username, role: user.role}
        }
    }
    verifyToken(token: string){
        return this.jwt.verifyAsync(token)
    }
}