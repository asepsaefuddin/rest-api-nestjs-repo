import { AutoIncrement, Column, CreatedAt, DataType, Model, PrimaryKey, Table, UpdatedAt } from "sequelize-typescript";

@Table({tableName: 'Anime', timestamps: true})
export class Anime extends Model<Anime>{
    @PrimaryKey
    @AutoIncrement
    @Column({type: DataType.INTEGER, allowNull: false})
    declare id: number
    // judul
    @Column({type: DataType.STRING, allowNull: false})
    judul: string
    // rating
    @Column({type: DataType.FLOAT, allowNull: false})
    rating: number
    // studio
    @Column({type: DataType.STRING, allowNull: false})
    studio: string
    // gambar
    @Column({type: DataType.STRING, allowNull: false})
    gambar: string
    // createdAt
    @CreatedAt
    @Column({type: DataType.DATE, field: 'createdAt'})
    declare createdAt: Date
    // updatedAt
    @UpdatedAt
    @Column({type: DataType.DATE, field: 'updatedAt'})
    declare updatedAt: Date
}