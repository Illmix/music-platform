import { Module } from '@nestjs/common';
import { AlbumController } from './album.controller';
import { AlbumService } from './album.service';
import {MongooseModule} from "@nestjs/mongoose";
import {Album, AlbumSchema} from "./album.schema";
import {Track, TrackSchema} from "../track/schemas/track.schema";
import {TrackModule} from "../track/track.module";
import {FileService} from "../file/file.service";

@Module({
  imports: [
    MongooseModule.forFeature([{name: Album.name, schema: AlbumSchema}]),
    MongooseModule.forFeature([{name: Track.name, schema: TrackSchema}]),
    TrackModule
  ],
  controllers: [AlbumController],
  providers: [AlbumService, FileService]
})
export class AlbumModule {}
