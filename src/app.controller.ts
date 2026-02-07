import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { AppService } from './app.service';
import { DtoAnime } from './dto/anime.dto';
import { DtoRegist } from './dto/register.dto';
import { DtoLogin } from './dto/login.dto';
import { AuthService } from './services/auth.service';
import { AuthGuards } from './guards/auth.guards';
import { Roles } from './decorator/role.decorator';
import { AnimeService } from './services/anime.gemini';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private authService: AuthService, private animeService: AnimeService) {}

  @UseGuards(AuthGuards)
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @UseGuards(AuthGuards)
  @Get('anime')
  getAllAnime(){
    return this.appService.getAnime()
  }
  // get by id
  @UseGuards(AuthGuards)
  @Get('anime/:id')
  getOneAnime(@Param('id') id: number){
    return this.appService.getOneData(id)
  }
  // menambah
  @UseGuards(AuthGuards)
  @Roles(['admin'])
  @Post('anime')
  @UsePipes(new ValidationPipe({whitelist: true, forbidNonWhitelisted:true}))
  createAnime(@Body() body: DtoAnime){
    return this.appService.createAnime(body)
  }
  @UseGuards(AuthGuards)
  @Roles(['admin'])
  @Post('anime/gemini')
  @UsePipes(new ValidationPipe({whitelist: true, forbidNonWhitelisted:true}))
  createAnimeOtomatis(){
    return this.animeService.AnimeGeneratedOtomatis()
  }
  // update
  @UseGuards(AuthGuards)
  @Roles(['admin'])
  @Put('anime/:id')
  @UsePipes(new ValidationPipe({whitelist: true, forbidNonWhitelisted:true}))
  updatedAnime(@Param('id') id: number, @Body() body: DtoAnime){
    return this.appService.updatedAnime(id, body)
  }
  // delete
  @UseGuards(AuthGuards)
  @Roles(['admin'])
  @Delete('anime/:id')
  deletedAnime(@Param('id') id: number){
    return this.appService.deletedAnime(id)
  }
  // register
  @Post('register')
  @UsePipes(new ValidationPipe({whitelist: true, forbidNonWhitelisted:true}))
  register(@Body() dto: DtoRegist){
    return this.authService.register(dto.email, dto.username, dto.password, dto.role)
  }
  // login
  @Post('login')
  @UsePipes(new ValidationPipe({whitelist: true, forbidNonWhitelisted:true}))
  login(@Body() dto: DtoLogin){
    return this.authService.login(dto.email, dto.password)
  }
}
