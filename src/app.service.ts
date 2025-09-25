import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Anime } from './models/anime.model';

@Injectable()
export class AppService {
  constructor(@InjectModel(Anime) private animeModel: typeof Anime){}
  getHello(): string {
    return 'Hello Asep!';
  }
  async getAnime(): Promise<Anime[]>{
    return this.animeModel.findAll()
  }
  async getOneData(id){
    return this.animeModel.findByPk(id)
  }
  // service menambah
  async createAnime(body){
    return this.animeModel.create(body)
  }
  // service untuk mengubah
  async updatedAnime(id, body){
    const result = await this.animeModel.update(body, {where: {id}})
    console.log(result, '<-----')
    if (result[0] === 0) {
      throw new NotFoundException('ga ada....')
    }
    return this.animeModel.findByPk(id)
  }
  async deletedAnime(id){
    const result = await this.animeModel.destroy({where: {id}})
    if (result) {
      return {
        message: "data berhasil di hapus"
      }
    }
    throw new NotFoundException('data tidak ada...')
  }
}
