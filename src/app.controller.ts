import {
  Controller,
  Get,
  Render,
  Post,
  Body,
  Headers,
  Param,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { CreateUrlDto } from './dto/create-url.dto';
import { nanoid } from 'nanoid';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private appService: AppService) {}

  @Get()
  @Render('index')
  root() {
    return { flag: false };
  }

  @Get(':urlCode')
  redirect(@Param() params, @Res() res: Response) {
    this.appService
      .findOne(params.urlCode)
      .then((response) => {
        return res.redirect(response.longUrl);
      })
      .catch(() => {
        return res.redirect('/');
      });
  }

  @Post()
  @Render('index')
  async createShortUrl(
    @Body() createUrlDto: CreateUrlDto,
    @Headers('HOST') host: string,
  ) {
    let urlCode = nanoid(5);
    let shortUrl = `${host}/${urlCode}`;

    await this.appService.exists(urlCode).then((res) => {
      if (res) {
        console.error('Url ya existe');
        shortUrl = 'La url generada ya existe intente de nuevo';
      } else {
        createUrlDto.shortUrl = shortUrl;
        createUrlDto.urlCode = urlCode;

        this.appService.create(createUrlDto);
      }
    });

    return { shortUrl: shortUrl, flag: true };
  }
}
