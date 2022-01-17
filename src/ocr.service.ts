/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { createWorker, Page, Worker } from 'tesseract.js';
// import { Cat } from './interfaces/cat.interface';

@Injectable()
export class OcrService {
  private _ocrWorkers: Worker[] = [];

  private async getOcrWorker(): Promise<Worker> {
    let worker = this._ocrWorkers.pop();
    if (!worker) {
      worker = createWorker({
        // corePath: string
        // langPath: string
        // cachePath: string
        // dataPath: string
        // workerPath: string
        // cacheMethod: string
        // workerBlobURL: boolean
        // gzip: boolean
        // logger: (arg: any) => void,
        // errorHandler: (arg: any) => void
      });
      await worker.load();
      await worker.loadLanguage('eng');
      await worker.initialize('eng');
      // console.log("await worker.initialize('eng') Ok");
    }
    return worker;
  }

  private freeWorker(worker: Worker): void {
    this._ocrWorkers.push(worker);
  }

  public async ocr(buffer: any): Promise<Page> {
    const worker = await this.getOcrWorker();
    try {
      const result = await worker.recognize(buffer);
      const page = result.data;
      return page;
    } catch (error) {
      console.log('throw error', error);
      throw error;
      // console.log(error);
    } finally {
      this.freeWorker(worker);
    }
  }

  // private readonly cats: Cat[] = [];
}
