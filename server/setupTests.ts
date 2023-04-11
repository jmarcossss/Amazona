import logger from './src/logger';

const { exec } = require('child_process');

beforeEach(async () => {
  await new Promise<void>((resolve, reject) => {
    exec('npm run copy:json', (error: any, stdout: any, stderr: any) => {
      if (error) {
        logger.error(`Error while clearing database: ${error}`);
        reject(error);
      }
      resolve();
    });
  });
});