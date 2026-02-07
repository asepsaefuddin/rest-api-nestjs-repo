import { AutoIncrement, Column, DataType, Index, Model, PrimaryKey, Table } from "sequelize-typescript";

@Table({tableName: 'Users', timestamps: true})
export class Users extends Model<Users>{
    // id
    @AutoIncrement
    @PrimaryKey
    @Column({type: DataType.INTEGER, allowNull: false})
    declare id: number
    // email
    @Index({unique: true})
    @Column({type: DataType.STRING, allowNull: false})
    declare email: string
    // username
    @Column({type: DataType.STRING, allowNull: false})
    declare username: string
    // password
    @Column({type: DataType.STRING, allowNull: false})
    declare password: string
    // role
    @Column({type: DataType.ENUM('admin', 'user'), allowNull: false, defaultValue: 'user'})
    declare role: 'admin' | 'user'
}