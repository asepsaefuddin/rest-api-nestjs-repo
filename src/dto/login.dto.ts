import { IsEmail, IsString, MinLength } from "class-validator"

export class DtoLogin{
    @IsEmail()
    email: string
    @IsString()
    @MinLength(6)
    password: string
}