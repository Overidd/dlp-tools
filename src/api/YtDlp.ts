import type { InfoOptions, InfoResult } from '../interface';
import { InfoStrategyImpl } from '../strategies';
import { BinaryProvider } from '../binary';
import { Executer } from '../core';
import { parseJson } from '../utils';

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
    // debug: config.debug || false,

    // Initial check
    this.binaryProvider.checkInstallation();
  }

  async getInfo<T extends InfoOptions>(
    url: string,
    options?: T
  ): Promise<InfoResult<T>> {
    const paths = await this.binaryProvider.getPaths();
    const executer = new Executer(paths?.ytdlp!);
    const command = new InfoStrategyImpl().buildCommand(url, options);
    const output = await executer.run(command);
    return parseJson(output);
  }
}