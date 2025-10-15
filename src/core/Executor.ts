import { spawn } from 'node:child_process';
import { EventEmitter } from 'node:events';
import { PassThrough } from 'node:stream';
import { YtdlpError } from './YtdlpError';

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

    console.log(this.binaryPath, args)

    return new Promise((resolve, reject) => {
      const proc = spawn(this.binaryPath, args, {
        killSignal: 'SIGKILL',
      });

      let output = '';
      let error = '';

      if (passThrough) {
        proc.stdout.pipe(passThrough);
        proc.stderr.pipe(passThrough);
      }

      proc.stdout.on('data', (data) => {
        const text = data.toString();

        if (text.includes('"progress"')) this.emit('progress', text);

        output += text;
        if (output.length > 10_000_000) {
          proc.kill();
          reject(YtdlpError.exec('Output too large'));
        }
      });

      proc.stderr.on('data', (data) => {
        if (passThrough) return;
        error += data.toString();
        this.emit('error', data.toString());
      });

      proc.on('close', (code) => {
        if (code === 0) {
          resolve(output.trim());
        } else {
          console.log({ error })
          reject(YtdlpError.exec(error || `yt-dlp exited with code ${code}`));
        }
      });

      proc.on('error', (err) => {
        reject(YtdlpError.exec(err.message));
      });
    });
  }
}