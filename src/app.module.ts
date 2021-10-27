import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UrlSchema } from './schemas/url.schema';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://urlshort:urlshort@cluster0.vpvcn.mongodb.net/url-shorten?retryWrites=true&w=majority',
    ),
    MongooseModule.forFeature([{ name: 'Url', schema: UrlSchema }]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
