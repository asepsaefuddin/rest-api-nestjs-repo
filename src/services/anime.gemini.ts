import { GoogleGenAI } from "@google/genai";
import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Anime } from "src/models/anime.model";
import { AnimeInterface } from "src/types/anime.interface";

@Injectable()
export class AnimeService{
    private ai: GoogleGenAI;
    constructor(@InjectModel(Anime) private animeModel: typeof Anime){
        this.ai = new GoogleGenAI({}); // ini instance untuk env variable `GEMINI_API_KEY`
    }
    async AnimeGeneratedOtomatis(){
        const prompt = `buatkan aku object anime jepang dan manhwa yang outputnya adalah object. juga hanya object aja yang di tampilkan. dan harus mengikuti struktur sebagai berikut:
        {
        "judul": "judul anime",
        "rating": ratingnya harus dari 0.0 sampai 10.0 buat nilai akhirnya ada 1-9 contoh (9.7),
        "studio": "studio dari judul animenya",
        "deskripsiGambar": "ini adalah deskripsi dari judul animenya"
  },`;
  try {
    const response = await this.ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: [{role: 'user', parts: [{text: prompt}]}],
        config: {
            responseMimeType: 'application/json',
            responseSchema: {
                type: 'object',
                properties: {
                    judul: {type: 'string'},
                    rating: {type: 'number'},
                    studio: {type: 'string'},
                    deskripsiGambar: {type: 'string'}
                },
                required : ['judul', 'rating', 'studio', 'deskripsiGambar']
            }
        }
    })
    if (!response.text) {
        throw new InternalServerErrorException('response tidak ada..')
    }
    const responseAnime = response.text;
    const parseToJson = JSON.parse(responseAnime);
    const encodingGambar = encodeURIComponent(parseToJson.deskripsiGambar) // melakukan / mendapatkan deskripsiGambar
    const polination = `https://image.pollinations.ai/prompt/${encodingGambar}?width=1024&height=768&nologo=true`;
    const newObj: AnimeInterface = {
        judul: parseToJson.judul,
        rating: parseToJson.rating,
        studio: parseToJson.studio,
        gambar: polination
    } 
    console.log(newObj, '<---- ini newObj')
    return this.animeModel.create(newObj as Anime)
  } catch (error) {
    throw new InternalServerErrorException('ai model gagal membuat anime object')
  }
    }
}