import got from 'got';
import * as fs from 'fs';
import * as path from 'path';
import type { Block } from 'tesseract.js';

async function parse(data: Buffer) {
  console.log(
    `sending a ${data.length} byte long file, magic: ${data
      .slice(0, 4)
      .toString('hex')}`,
  );
  const req = await got
    .post(`http://127.0.0.1:3000/blocks`, {
      headers: { 'Content-Type': 'image/png' },
      body: data,
    })
    .json<Block[]>();
  console.log(req[0].text.trim());
  return 'ok';
}

async function main() {
  // const img = path.join(__dirname, 'exampleBW.png');
  {
    const img = path.join(__dirname, 'exampleRGB.png');
    const data = fs.readFileSync(img, { encoding: null });
    await parse(data);
  }

  {
    const img = path.join(__dirname, 'exampleBW.png');
    const data = fs.readFileSync(img, { encoding: null });
    await parse(data);
  }

  {
    // broken
    const img = path.join(__dirname, 'exampleBW.png');
    const data = fs.readFileSync(img, { encoding: null });
    data[5] = 0;
    data[6] = 0;
    await parse(data);
  }

  return 'ok';
}

main();
