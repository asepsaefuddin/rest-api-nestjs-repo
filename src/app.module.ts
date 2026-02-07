import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Anime } from './models/anime.model';
import { Users } from './models/user.model';
import { AuthGuards } from './guards/auth.guards';
import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';
import { Reflector } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { AnimeService } from './services/anime.gemini';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env'
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: '127.0.0.1',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'anime_db',
      logging: false, // untuk menonaktifkan log sql di console
      synchronize: false, // untuk supaya tidak otomatis update tabel
      models: [Anime, Users],
    }),
    SequelizeModule.forFeature([Anime, Users]),
    JwtModule.register({
      global: true, // supaya jwtmodule di terapkan diseluruh module
      secret: process.env.JWT_SECRET || 'asep',
      signOptions: {expiresIn: process.env.JWT_EXPIRE || '1d'}
    })
  ],
  controllers: [AppController],
  providers: [AppService, AuthGuards, AuthService, UserService, Reflector, AnimeService],
})
export class AppModule {}
