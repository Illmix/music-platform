import {Body, Controller, Delete, Get, Param, Post, UploadedFiles, UseInterceptors} from '@nestjs/common';
import {AlbumService} from "./album.service";
import {ObjectId} from "mongoose";
import {CreateAlbumDto} from "./dto/create-album.dto";
import {TrackDto} from "./dto/add-track.dto";
import {FileFieldsInterceptor} from "@nestjs/platform-express";

@Controller('album')
export class AlbumController {

    constructor(private albumService: AlbumService) {}

    @Post()
    @UseInterceptors(FileFieldsInterceptor([
        {name: 'picture', maxCount: 1}
    ]))
    create(@Body() dto: CreateAlbumDto, @UploadedFiles() files) {
        const {picture} = files
        return this.albumService.create(dto, picture[0])
    }

    @Post('/addTrack/:id')
    addTrack(@Param('id') id: ObjectId, @Body() dto: TrackDto) {
        return this.albumService.addTrack(id, dto)
    }

    @Post('/deleteTrack/:id')
    deleteTrack(@Param('id') id: ObjectId, @Body() dto: TrackDto) {
        return this.albumService.deleteTrack(id, dto)
    }

    @Get()
    getAll(){
        return this.albumService.getAll()
    }

    @Get(':id')
    getOne(@Param('id') id: ObjectId) {
        return this.albumService.getOne(id)
    }

    @Delete(':id')
    delete(@Param('id') id: ObjectId) {
        return this.albumService.delete(id)
    }

}
