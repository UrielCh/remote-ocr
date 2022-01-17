# remote-ocr

tesseract js via a nest-js + fastify server

## why

This project intend to debug tesseract.js random crashes.

## Installation

```bash
pnpm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash

curl.exe -i -H 'Content-Type: image/png' -X POST --data-binary  @test/exampleBW.png http://127.0.0.1:3000/meta

# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
