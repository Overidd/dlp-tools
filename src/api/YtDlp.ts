import { PassThrough } from 'node:stream';

import type {
  FormatKeyWord,
  FormatOptions,
  InfoOptions,
  InfoResult,
  PipeResponse
} from '../interface';

import {
  parseJson,
  stringToProgress,
  UniqueIdGenerator
} from '../utils';

import {
  InfoStrategy,
  StrategyDownload
} from '../strategies';

import {
  BinaryProvider
} from '../binary';

import {
  Executer
} from '../core';

interface IBinary {
  autoDownload: boolean;
  ffmpegPath?: string;
  ytDlpPath?: string;
}

interface IOptions {
  outputDir?: string;
  binary?: Partial<IBinary>;
}

export class Ytdlp {
  private binaryProvider: BinaryProvider;

  constructor(options: IOptions = {}) {
    this.binaryProvider = new BinaryProvider({
      ytdlpPath: options.binary?.ytDlpPath,
      ffmpegPath: options.binary?.ffmpegPath,
    });

    // Initial check
    this.binaryProvider.checkInstallation();
  }

  /**
   * Obtiene información detallada sobre un video o playlist de YouTube utilizando yt-dlp.
   * 
   * @param url La URL del video o playlist de YouTube.
   * @param options Opciones adicionales para la consulta de información. Por defecto, la opción `dumpSingleJson` está establecida en `true`.
   * @returns Un objeto con la información obtenida. Si la respuesta es una lista, se retorna un objeto con el tipo 'playlist' y sus entradas.
   */
  async getInfo<T extends InfoOptions>(
    url: string,
    options?: T
  ): Promise<InfoResult<T>> {
    const paths = await this.binaryProvider.getPaths();
    const executer = new Executer(paths?.ytdlp!);
    const command = new InfoStrategy().buildCommand(url, options);
    const output = await executer.run(command);

    const parsed = parseJson(output);
    const result: any = Array.isArray(parsed) ? {
      id: UniqueIdGenerator.hex(16),
      _type: 'playlist',
      entries: parsed,
    } : parsed as InfoResult<T>;

    return result
  }

  async download<T extends FormatKeyWord>(
    url: string,
    options?: FormatOptions<T>
  ): Promise<string> {
    const paths = await this.binaryProvider.getPaths();
    const executer = new Executer(paths?.ytdlp!);
    const command = new StrategyDownload().buildCommand(
      url, paths?.ffmpeg!, options
    );

    executer.on('progress', (data) => {
      const progress = stringToProgress(data);
      options?.onProgress?.(progress);
    });

    executer.on('error', (error) => {
      options?.onError?.(error);
    });

    executer.on('end', () => {
      options?.onEnd?.();
    });

    return executer.run(command);
  }

  stream<T extends FormatKeyWord>(
    url: string,
    options?: FormatOptions<T>
  ): PipeResponse {
    const paths = this.binaryProvider.getPathsSync();
    const executer = new Executer(paths?.ytdlp!);
    const command = new StrategyDownload().buildCommand(
      url, paths?.ffmpeg!, options
    );

    const passThrough = new PassThrough();

    const output = executer.run(command, passThrough);

    executer.on('progress', (data) => {
      const progress = stringToProgress(data);
      options?.onProgress?.(progress);
    });

    executer.on('error', (error) => {
      options?.onError?.(error);
    });

    executer.on('end', () => {
      options?.onEnd?.();
    });

    return {
      promise: output,

      pipeSync: (destination: NodeJS.WritableStream, options?: { end?: boolean }) =>
        passThrough.pipe(destination, options),

      pipe: (
        destination: NodeJS.WritableStream,
        options?: { end?: boolean }
      ) => (
        new Promise((resolve, reject) => {
          const pt = passThrough.pipe(destination, options);
          destination.on('finish', () => resolve(pt));
          destination.on('error', reject);
        })
      ),
    };
  }
}

// downloadSync<T extends FormatKeyWord>(
//   url: string,
//   options?: Omit<FormatOptions<T>, 'onProgress'>
// ): string {
// }