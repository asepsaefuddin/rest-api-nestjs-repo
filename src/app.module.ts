import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Anime } from './models/anime.model';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: '127.0.0.1',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'anime_db',
      models: [Anime],
    }),
    SequelizeModule.forFeature([Anime])
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
