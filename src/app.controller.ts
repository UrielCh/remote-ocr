/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Req } from '@nestjs/common';
import { Block, Line, Page, Paragraph, Symbol, Word } from 'tesseract.js';
import { OcrService } from './ocr.service';
import { FastifyRequest } from 'fastify';
@Controller()
export class AppController {
  constructor(private ocrService: OcrService) { }

  @Get()
  getHello(): string {
    return 'Hello';
  }

  @Post('all')
  async doOcr(@Req() req: FastifyRequest): Promise<Page> {
    const page = await this.ocrService.ocr(req.body);
    return page;
  }

  @Post('blocks')
  async doOcrblocks(@Req() req: FastifyRequest): Promise<Block[]> {
    const page = await this.ocrService.ocr(req.body);
    return page.blocks;
  }

  @Post('lines')
  async doOcrbox(@Req() req: FastifyRequest): Promise<Line[]> {
    const page = await this.ocrService.ocr(req.body);
    return page.lines;
  }

  @Post('paragraphs')
  async doOcrparagraphs(@Req() req: FastifyRequest): Promise<Paragraph[]> {
    const page = await this.ocrService.ocr(req.body);
    return page.paragraphs;
  }


  @Post('symbols')
  async doOcrsymbols(@Req() req: FastifyRequest): Promise<Symbol[]> {
    const page = await this.ocrService.ocr(req.body);
    return page.symbols;
  }

  @Post('words')
  async doOcrwords(@Req() req: FastifyRequest): Promise<Word[]> {
    const page = await this.ocrService.ocr(req.body);
    return page.words;
  }

  @Post('meta')
  async doOcrMeta(@Req() req: FastifyRequest): Promise<{ confidence: number; oem: string; osd: string; psm: string; text: string; version: string; hocr: string | null; tsv: string | null; box: string | null; unlv: string | null; sd: string | null; }> {
    const page = await this.ocrService.ocr(req.body);
    const { confidence, oem, osd, psm, text, version, hocr, tsv, box, unlv, sd } = page;
    return { confidence, oem, osd, psm, text, version, hocr, tsv, box, unlv, sd };
  }

}
