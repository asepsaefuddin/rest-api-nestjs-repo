import { Body, Controller, Delete, Get, Param, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { AppService } from './app.service';
import { DtoAnime } from './dto/anime.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @Get('anime')
  getAllAnime(){
    return this.appService.getAnime()
  }
  // get by id
  @Get('anime/:id')
  getOneAnime(@Param('id') id: number){
    return this.appService.getOneData(id)
  }
  // menambah
  @Post('anime')
  @UsePipes(new ValidationPipe({whitelist: true, forbidNonWhitelisted:true}))
  createAnime(@Body() body: DtoAnime){
    return this.appService.createAnime(body)
  }
  // update
  @Put('anime/:id')
  @UsePipes(new ValidationPipe({whitelist: true, forbidNonWhitelisted:true}))
  updatedAnime(@Param('id') id: number, @Body() body: DtoAnime){
    return this.appService.updatedAnime(id, body)
  }
  // delete
  @Delete('anime/:id')
  deletedAnime(@Param('id') id: number){
    return this.appService.deletedAnime(id)
  }
}
