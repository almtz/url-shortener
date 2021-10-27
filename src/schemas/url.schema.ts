import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UrlDocument = Url & Document;

@Schema()
export class Url {
  @Prop()
  longUrl: string;

  @Prop()
  shortUrl: string;

  @Prop()
  urlCode: string;
}

export const UrlSchema = SchemaFactory.createForClass(Url);
