import type { InfoOptions, InfoResult } from '../interface';
import { InfoStrategyImpl } from '../strategies';
import { BinaryProvider } from '../binary';
import { Executer } from '../core';
import { parseJson, UniqueIdGenerator } from '../utils';

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
    const command = new InfoStrategyImpl().buildCommand(url, options);
    const output = await executer.run(command);

    /*=======================*/
    const parsed = parseJson(output);
    const resul: any = {};
    if (Array.isArray(parsed)) {
      resul['id'] = UniqueIdGenerator.hex(16);
      resul['_type'] = 'playlist';
      resul['entries'] = parsed;
      return resul;
    }
    return parsed;
  }
}