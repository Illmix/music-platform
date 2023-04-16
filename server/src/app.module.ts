import { Module } from '@nestjs/common';
import { TrackModule } from './track/track.module';
import { AlbumModule } from './album/album.module';
import {MongooseModule} from "@nestjs/mongoose";
import { FileModule } from './file/file.module';
import {ServeStaticModule} from "@nestjs/serve-static";
import * as path from "path";

@Module({
  imports: [
    TrackModule,
    AlbumModule,
    MongooseModule.forRoot('mongodb+srv://illachaban1100:123@cluster0.yo6bmxz.mongodb.net/?retryWrites=true&w=majority'),
    FileModule,
    ServeStaticModule.forRoot({
      rootPath: path.resolve(__dirname, 'static'),
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
