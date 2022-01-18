// npm run build
// the start me
module.exports = {
  apps: [
    {
      name: 'remote-ocr',
      script: 'dist/main.js',
      // Options reference: https://pm2.io/doc/en/runtime/reference/ecosystem-file/
      // args: 'one two',
      instances: 2,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'production',
      },
    },
  ],
};
