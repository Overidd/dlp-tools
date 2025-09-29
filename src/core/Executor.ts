import { spawn } from 'node:child_process';
import { EventEmitter } from 'node:events';
import { PassThrough } from 'node:stream';

export class Executer extends EventEmitter {
  constructor(private binaryPath: string) {
    super();
    if (!binaryPath) {
      throw new Error('Binary path is required');
    }
  }

  run(
    args: string[],
    passThrough?: PassThrough,
  ): Promise<string> {
    return new Promise((resolve, reject) => {
      const proc = spawn(this.binaryPath, args);

      let output = '';
      let error = '';

      proc.stdout.on('data', (data) => {
        output += data.toString();
        this.emit('progress', data.toString());
      });

      proc.stderr.on('data', (data) => {
        error += data.toString();
        this.emit('error', data.toString());
      });

      proc.on('close', (code) => {
        if (code === 0) {
          resolve(output.trim());
        } else {
          reject(new Error(error || `yt-dlp exited with code ${code}`));
        }
      });
    });
  }
}