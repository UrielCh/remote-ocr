import { Controller, Get, Post, Req } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('ocr')
  doOcr(@Req() req: any): string {
    console.log(req.body);
    return this.appService.getHello();
  }
}
