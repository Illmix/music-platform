import { Injectable } from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {Album, AlbumDocument} from "./album.schema";
import {Model, ObjectId} from "mongoose";
import {CreateAlbumDto} from "./dto/create-album.dto";
import {Track, TrackDocument} from "../track/schemas/track.schema";
import {TrackDto} from "./dto/add-track.dto";
import {FileService, FileType} from "../file/file.service";

@Injectable()
export class AlbumService {

    constructor(@InjectModel(Album.name) private albumRepository: Model<AlbumDocument>,
                @InjectModel(Track.name) private trackRepository: Model<TrackDocument>,
                private fileService: FileService) {}

    async create(dto: CreateAlbumDto, picture): Promise<Album> {
        const picturePath = this.fileService.createFile(FileType.IMAGE, picture)
        const album = await this.albumRepository.create({...dto, picture: picturePath})
        return album
    }

    async addTrack(id: ObjectId, dto: TrackDto): Promise<Album> {
        const track = await this.trackRepository.findById(dto.trackId)
        const album = await this.albumRepository.findById(id)
        album.tracks.push(track.id)
        await album.save()
        return album
    }

    async deleteTrack(id: ObjectId, dto: TrackDto): Promise<Album> {
        const album = await this.albumRepository.findById(id)
        album.tracks = album.tracks.filter((track) => track.toString() !== dto.trackId.toString());
        await album.save();
        return album
    }

    async getAll(): Promise<Album[]> {
        const albums = await this.albumRepository.find()
        return albums
    }

    async getOne(id: ObjectId): Promise<Album> {
        const album = await this.albumRepository.findById(id).populate('tracks')
        return album
    }

    async delete(id: ObjectId): Promise<Album>  {
        const album = this.albumRepository.findByIdAndDelete(id)
        return album
    }
}
