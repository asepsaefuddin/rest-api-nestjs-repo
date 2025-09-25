import { IsNumber, IsString, IsUrl, Max, Min } from "class-validator"

export class DtoAnime{
    @IsString()
    judul: string;
    @IsNumber()
    @Min(0)
    @Max(10)
    rating: number
    @IsString()
    studio: string;
    @IsUrl()
    gambar: string
}