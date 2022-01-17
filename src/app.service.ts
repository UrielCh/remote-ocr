import { Injectable } from '@nestjs/common';
import { OcrService } from './ocr.service';

@Injectable()
export class AppService {
  constructor(private ocr: OcrService) {}

  getHello(): string {
    return 'Hello World!';
  }
}
