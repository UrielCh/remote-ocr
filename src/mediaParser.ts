import { FastifyInstance, FastifyRequest } from 'fastify';

const MAGIC_JPG = Buffer.from([0xff, 0xd8, 0xff, 0xe0]);
const MAGIC_PNG = Buffer.from([0x89, 0x50, 0x4e, 0x47]);
const MAGIC_GIF = Buffer.from([0x47, 0x49, 0x46, 0x38]);

export function addMediaParser(fastify: FastifyInstance) {
  fastify.addContentTypeParser(
    /^image\/.*/,
    function (request: FastifyRequest, payload, done) {
      // const len = Number(request.headers['content-length']);
      const contentType = request.headers['content-type'];
      const buffers = [];
      payload.on('data', (chunk) => {
        buffers.push(chunk);
      });
      payload.on('end', () => {
        const total = Buffer.concat(buffers);
        const magic = total.slice(0, 4);
        let pass = false;
        switch (contentType) {
          case 'image/jpeg':
            if (magic.equals(MAGIC_JPG)) pass = true;
            break;
          case 'image/png':
            if (magic.equals(MAGIC_PNG)) pass = true;
            break;
          case 'image/gif':
            if (magic.equals(MAGIC_GIF)) pass = true;
            break;
        }
        if (!pass)
          done(
            Error(`bad Magic ${magic.toString('hex')} for ${contentType}`),
            null,
          );
        else done(null, Buffer.concat(buffers));
      });
    },
  );
}
