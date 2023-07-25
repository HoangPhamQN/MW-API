import {
  Controller,
  Get,
  Post,
  UseInterceptors,
  UploadedFile,
  Res,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Multer } from 'multer';
import { Request, Response } from 'express';
import { AppService } from './app.service';
import { FirebaseService } from './utils/upload';

@Controller('upload')
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly firebaseService: FirebaseService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('image')
  @UseInterceptors(FileInterceptor('file'))
  async uploadImage(@UploadedFile() file: Multer.File, @Res() res: Response) {
    const imageUrl = await this.firebaseService.uploadImage(file);
    res.status(200).json({ imageUrl });
  }
}
