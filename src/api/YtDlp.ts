import type { InfoOptions, InfoType, PlaylistInfo, VideoInfo } from '../interface';
import { InfoStrategyImpl } from '../strategies';
import { BinaryProvider } from '../binary';
import { Executer } from '../core';

interface IBinary {
  autoDownload: boolean;
  ffmpegPath?: string;
  ytDlpPath?: string;
}

interface IOptions {
  outputDir?: string;
  binary?: Partial<IBinary>;
}

export class YtDlp {
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

  async getInfo<T extends InfoType>(
    url: string,
    options?: InfoOptions
  ): Promise<T extends 'video' ? VideoInfo : PlaylistInfo> {
    const paths = await this.binaryProvider.getPaths();
    const executer = new Executer(paths?.ytdlp!);
    const command = new InfoStrategyImpl().buildCommand(url, options);
    const output = await executer.run(command);
    return JSON.parse(output);
  }
}