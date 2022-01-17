import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OcrService } from './ocr.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, OcrService],
})
export class AppModule {}
