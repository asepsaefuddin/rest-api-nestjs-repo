import { IsEmail, IsIn, IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator"

export class DtoRegist{
    @IsEmail()
    @IsNotEmpty()
    email: string
    @IsString()
    @IsNotEmpty()
    username: string
    @IsString()
    @MinLength(6)
    password: string
    @IsOptional()
    @IsIn(['admin', 'user'])
    role: 'admin' | 'user'
}