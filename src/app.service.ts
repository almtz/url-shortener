import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUrlDto } from './dto/create-url.dto';
import { Url, UrlDocument } from './schemas/url.schema';

@Injectable()
export class AppService {
  constructor(@InjectModel('Url') private urlModel: Model<UrlDocument>) {}

  async create(createUrlDto: CreateUrlDto): Promise<Url> {
    const createdUrl = new this.urlModel(createUrlDto);
    return createdUrl.save();
  }

  async exists(urlCode: string): Promise<Boolean> {
    return this.urlModel.exists({ urlCode: urlCode });
  }

  async findOne(urlCode: string): Promise<Url> {
    return this.urlModel.findOne({ urlCode: urlCode }).exec();
  }

  async findAll(): Promise<Url[]> {
    return this.urlModel.find().exec();
  }
}
