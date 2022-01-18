/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Req } from '@nestjs/common';
import * as Tesseract from 'tesseract.js';
import { OcrService } from './ocr.service';
import { FastifyRequest } from 'fastify';
@Controller()
export class AppController {
  constructor(private ocrService: OcrService) { }

  @Get()
  getHello(): string {
    return 'Hello World!';
  }

  @Post('all')
  async doOcr(@Req() req: FastifyRequest): Promise<Tesseract.Page> {
    const page = await this.ocrService.ocr(req.body as Buffer);
    return page;
  }

  @Post('blocks')
  async doOcrblocks(@Req() req: FastifyRequest): Promise<Tesseract.Block[]> {
    const page = await this.ocrService.ocr(req.body as Buffer);
    return page.blocks;
  }

  @Post('lines')
  async doOcrbox(@Req() req: FastifyRequest): Promise<Tesseract.Line[]> {
    const page = await this.ocrService.ocr(req.body as Buffer);
    return page.lines;
  }

  @Post('paragraphs')
  async doOcrparagraphs(@Req() req: FastifyRequest): Promise<Tesseract.Paragraph[]> {
    const page = await this.ocrService.ocr(req.body as Buffer);
    return page.paragraphs;
  }

  @Post('symbols')
  async doOcrsymbols(@Req() req: FastifyRequest): Promise<Tesseract.Symbol[]> {
    const page = await this.ocrService.ocr(req.body as Buffer);
    return page.symbols;
  }

  @Post('words')
  async doOcrwords(@Req() req: FastifyRequest): Promise<Tesseract.Word[]> {
    const page = await this.ocrService.ocr(req.body as Buffer);
    return page.words;
  }

  @Post('meta')
  async doOcrMeta(@Req() req: FastifyRequest): Promise<{ confidence: number; oem: string; osd: string; psm: string; text: string; version: string; hocr: string | null; tsv: string | null; box: string | null; unlv: string | null; sd: string | null; }> {
    const page = await this.ocrService.ocr(req.body as Buffer);
    const { confidence, oem, osd, psm, text, version, hocr, tsv, box, unlv, sd } = page;
    return { confidence, oem, osd, psm, text, version, hocr, tsv, box, unlv, sd };
  }

}
