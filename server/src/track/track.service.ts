import {Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {Track, TrackDocument} from "./schemas/track.schema";
import {Model, ObjectId} from "mongoose";
import {Comment, CommentDocument} from "./schemas/comment.schema";
import {CreateTrackDto} from "./dto/create-track.dto";
import {CreateCommentDto} from "./dto/create-comment.dto";
import {FileService, FileType} from "../file/file.service";

@Injectable()
export class TrackService {

    constructor(@InjectModel(Track.name) private trackRepository: Model<TrackDocument>,
                @InjectModel(Comment.name) private commentRepository: Model<CommentDocument>,
                private fileService: FileService) {}

    async create(dto: CreateTrackDto, picture, audio): Promise<Track> {
        const picturePath = this.fileService.createFile(FileType.IMAGE, picture)
        const audioPath = this.fileService.createFile(FileType.AUDIO, audio)
        const track =
            await this.trackRepository.create({...dto, listens: 0, audio: audioPath, picture: picturePath})
        return track
    }
    async delete(id: ObjectId): Promise<ObjectId> {
        const track= await this.trackRepository.findByIdAndDelete(id)
        return track.id
    }
    async getAll(count: number = 10, offset: number = 0): Promise<Track[]> {
        const tracks = await this.trackRepository.find().skip(offset).limit(count);
        return tracks
    }
    async getOne(id: ObjectId): Promise<Track> {
        const track = await this.trackRepository.findById(id).populate('comments')
        return track
    }

    async addComment(dto: CreateCommentDto): Promise<Comment> {
        const track= await this.trackRepository.findById(dto.trackId)
        const comment = await this.commentRepository.create({...dto})
        track.comments.push(comment.id)
        await track.save();
        return comment
    }

    async listen(id: ObjectId) {
        const track= await this.trackRepository.findById(id)
        track.listens += 1
        await track.save()
        return id
    }

    async search(query: string): Promise<Track[]> {
       const tracks = await this.trackRepository.find({
           name: {$regex: new RegExp(query, 'i')}
       })
        return tracks;
    }
}
