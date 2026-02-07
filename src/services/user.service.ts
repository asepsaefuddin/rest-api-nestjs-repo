import { ConflictException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
// import bcrypt from "node_modules/bcryptjs";
import * as bcrypt from 'bcryptjs'
import { Users } from "src/models/user.model";

@Injectable()
export class UserService{
    constructor(@InjectModel(Users) private userModel: typeof Users){}
    async findByEmail(email: string){
        return this.userModel.findOne({where: {email}})
    }
    // create
    async create(email: string, username: string, password: string, role: 'admin' | 'user' = 'user'){
        const cekEmail = await this.findByEmail(email)
        if (cekEmail) {
            throw new ConflictException('email sudah terdaftar')
        }
        const hashPassword = await bcrypt.hash(password, 12) // untuk salt klo number 2 pangkat salt
        return this.userModel.create({email, username, password: hashPassword, role} as Users)
    }
    // validasi
    async validationUser(email: string, password: string){
        const user = await this.findByEmail(email)
        if (!user) {
            return null
        }
        if(!user.password){
            return null
        }
        const comparePassword = await bcrypt.compare(password, user.password);
        if (!comparePassword) {
            return null
        }
        return user
    }
}