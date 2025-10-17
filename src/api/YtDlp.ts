import { PassThrough } from 'node:stream';

import type {
  FormatKeyWord,
  FormatOptions,
  IArgsOptions,
  InfoOptions,
  InfoResult,
  PipeResponse
} from '../interface';

import {
  parseJson,
  VideoProgressUtils,
  UniqueIdGenerator
} from '../utils';

import {
  ExecStrategy,
  InfoStrategy,
  StrategyDownload,
  StrategyStream
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

  /**
   * Ejecuta el binario de ytdlp con la URL y las opciones proporcionadas.
   *
   * Firma del método:
   * - url: string — URL del recurso a procesar (obligatorio).
   * - options?: IArgsOptions — objeto de opciones opcional para construir el comando.
   *
   * @param url - URL del recurso a procesar.
   * @param options - Opciones opcionales para construir el comando de ejecución.
   */
  async exec(url: string, options?: IArgsOptions): Promise<string> {
    const paths = await this.binaryProvider.getPaths();
    const executer = new Executer(paths?.ytdlp!);
    const command = new ExecStrategy().buildCommand(url, options);
    return executer.run(command);
  }



  /**
   * Descarga un recurso (vídeo/audio) a partir de la URL indicada y devuelve la ruta
   * del archivo resultante.
   *
   * @param url - URL del recurso a descargar.
   * @param options - Opcional. Configuración de formato y callbacks (por ejemplo
   *                  onProgress, onError, onEnd). Su forma está condicionada por el
   *                  tipo genérico `T` (FormatOptions<T>).
   * @returns Promise<string> - Promesa que se resuelve con la ruta del archivo descargado.
   *                            La promesa puede rechazarse si ocurre un error durante
   *                            el proceso de descarga.
   */
  async download<T extends FormatKeyWord>(
    url: string,
    options?: FormatOptions<T>
  ): Promise<string> {
    const paths = await this.binaryProvider.getPaths();
    const executer = new Executer(paths?.ytdlp!);
    const command = new StrategyDownload().buildCommand(
      url, paths?.ffmpeg!, options
    );
    const output = executer.run(command);

    executer.on('progress', (data) => {
      const progress = VideoProgressUtils.stringToProgress(data);
      if (!progress) return;
      options?.onProgress?.(progress);
    });

    executer.on('error', (error) => {
      options?.onError?.(error);
    });

    executer.on('end', () => {
      options?.onEnd?.();
    });

    return output
  }

  /**
   * Realiza la transmisión (streaming) de un recurso (URL) usando la configuración de formato indicada.
   *
   * @param url - URL del recurso de vídeo/audio a transmitir.
   * @param options - Opciones opcionales de tipo FormatOptions<T> que controlan el formato y ofrecen callbacks:
   *                    - onProgress?: (progress: VideoProgress) => void
   *                    - onError?: (error: Error) => void
   *                    - onEnd?: () => void
   *                    (y otras opciones relacionadas con la selección de formato).
   * @returns PipeResponse - Objeto que contiene:
   *                         - promise: Promise que representa la ejecución del proceso de descarga/streaming y se resuelve o rechaza
   *                           cuando el ejecutor finaliza o ocurre un error.
   *                         - pipeSync(destination, { end? }): Conecta sincrónicamente el flujo interno (PassThrough) al destino
   *                           y devuelve el stream resultante. No espera a la finalización del destino.
   *                         - pipe(destination, { end? }): Conecta el flujo al destino y devuelve una Promise que se resuelve
   *                           cuando el destino emite 'finish' y se rechaza si ocurre un 'error'.
   */
  stream<T extends FormatKeyWord>(
    url: string,
    options?: FormatOptions<T>
  ): PipeResponse {
    const paths = this.binaryProvider.getPathsSync();
    const executer = new Executer(paths?.ytdlp!);
    const command = new StrategyStream().buildCommand(
      url, paths?.ffmpeg!, options
    );

    const passThrough = new PassThrough();

    const output = executer.run(command, passThrough);

    executer.on('progress', (data) => {
      const progress = VideoProgressUtils.stringToProgress(data);
      if (!progress) return;
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