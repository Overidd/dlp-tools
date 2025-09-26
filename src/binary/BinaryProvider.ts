import { CustomError } from "../core";
import { typeSystem } from "../utils";
import { ytDlpUrls } from "./binMap";
import { InstallBinary } from "./InstallBinary";




export class BinaryProvider {
  private ytdlpPath: string;
  private ffmpegPath: string;
  private installBinary: InstallBinary;

  constructor({
    ytdlpPath = 'yt-dlp',
    ffmpegPath = 'ffmpeg'
  }) {
    this.ytdlpPath = ytdlpPath;
    this.ffmpegPath = ffmpegPath;
    this.installBinary = new InstallBinary();
  }

  getPathsSync({
    ytdlp = true,
    ffmpeg = true
  }): { [key: string]: string } | null {

    // Solamnte retornamos los path exisotenes
    return null;
  }

  async getPaths({
    ytdlp = true,
    ffmpeg = true
  }): Promise<{ [key: string]: string } | null> {

    return null;
  }

  checkInstallationSync(): Boolean {
    return true;
  }

  // TODO: No debe lanzar excepciones
  async checkInstallation({
    ytdlp = true,
    ffmpeg = true
  }): Promise<Boolean> {
    let isExistYtdlp = false;
    let isExistFfmpeg = false;
    const system = typeSystem();

    if (ytdlp) {
      isExistYtdlp = await this.installBinary.existSync(this.ytdlpPath);

      if (!isExistYtdlp) {
        throw CustomError.install(`El binario ${this.ytdlpPath} no esta instalado \nRecomendado para su sistema operativo: ${system.os} ${ytDlpUrls[system.os]}`);
      }
    }
    if (ffmpeg) {
      isExistFfmpeg = await this.installBinary.existSync(this.ffmpegPath);

      if (!isExistFfmpeg) {
        throw CustomError.install(`El binario ${this.ffmpegPath} no esta instalado \nRecomendado para su sistema operativo: ${system.os} ${ytDlpUrls[system.os]}`);
      }
    }

    return Promise.resolve(isExistYtdlp && isExistFfmpeg);
  }
}