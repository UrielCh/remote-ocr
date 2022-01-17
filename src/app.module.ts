import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { OcrService } from './ocr.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [OcrService],
})
export class AppModule {}
