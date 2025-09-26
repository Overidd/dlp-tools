import { Executor } from '../core';


interface IYtDlp {
  getInfo(url: string): Promise<any>
}

interface IBinary {
  autoDownload: boolean,
  ffmpegPath: string | null,
  ytDlpPath: string | null,
}

interface IOptions {
  outputDir: string,
  binary: IBinary,
}

export class YtDlp implements IYtDlp {
  private binary: IBinary;

  constructor(options: IOptions) {
    this.binary = options.binary
    // TODO temporal la asignacion de la ruta del binario
  }

  async getInfo(url: string): Promise<any> {
    const executor = new Executor(this.binary.ytDlpPath || 'yt-dlp');

    const command = new CommandBuilder()
      .setUrl(url)
      .setFlag('--dump-json')
      .build();

    return await executor.run(command);
  }

}
