import { ytDlpUrls, InstallBinary } from '.';
import { YtdlpError } from '../core';
import { typeSystem } from '../utils';

export interface BinaryPaths {
  ytdlp?: string;
  ffmpeg?: string;
}

export class BinaryProvider {
  private readonly ytdlpPath: string;
  private readonly ffmpegPath: string;
  private readonly installBinary: InstallBinary;

  constructor({
    ytdlpPath,
    ffmpegPath,
  }: { ytdlpPath?: string; ffmpegPath?: string } = {}) {
    this.ytdlpPath = ytdlpPath || 'yt-dlp';
    this.ffmpegPath = ffmpegPath || 'ffmpeg';
    this.installBinary = new InstallBinary();
  }

  /**
   * Get the paths of the binaries synchronously (without installation validation).
   */
  getPathsSync({ ytdlp = true, ffmpeg = true } = {}): BinaryPaths | null {
    const paths: BinaryPaths = {};

    if (ytdlp) paths.ytdlp = this.ytdlpPath;
    if (ffmpeg) paths.ffmpeg = this.ffmpegPath;

    return Object.keys(paths).length > 0 ? paths : null;
  }

  /**
   * Get the paths of the binaries asynchronously (without installation validation).
   */
  async getPaths({ ytdlp = true, ffmpeg = true } = {}): Promise<BinaryPaths | null> {
    return this.getPathsSync({ ytdlp, ffmpeg });
  }

  /**
   * Check synchronously if the binaries exist.
   */
  checkInstallationSync({ ytdlp = true, ffmpeg = true } = {}): boolean {
    try {
      if (ytdlp && !this.installBinary.existSync(this.ytdlpPath)) return false;
      if (ffmpeg && !this.installBinary.existSync(this.ffmpegPath)) return false;
      return true;
    } catch (err) {
      throw YtdlpError.install(`Error checking binaries: ${(err as Error).message}`);
    }
  }

  /**
   * Check asynchronously if the binaries exist. 
   * Throws an error with recommendations if any are missing.
   */
  async checkInstallation({ ytdlp = true, ffmpeg = true } = {}): Promise<boolean> {
    const system = typeSystem();

    if (ytdlp) {
      const exists = await this.installBinary.existSync(this.ytdlpPath);
      if (!exists) {
        throw YtdlpError.install(
          `The binary "${this.ytdlpPath}" is not installed.\n` +
          `Recommended for ${system.os}: ${ytDlpUrls[system.os]}`
        );
      }
    }

    if (ffmpeg) {
      const exists = await this.installBinary.existSync(this.ffmpegPath);
      if (!exists) {
        throw YtdlpError.install(
          `The binary "${this.ffmpegPath}" is not installed.\n` +
          `Recommended for ${system.os}: ${ytDlpUrls[system.os]}`
        );
      }
    }

    return true;
  }
}



// // Métodos wrapper
// getPathsSync(params?: { ytdlp?: boolean; ffmpeg?: boolean }) {
//   return this.binaryProvider.getPathsSync(params);
// }

// async getPaths(params?: { ytdlp?: boolean; ffmpeg?: boolean }) {
//   return this.binaryProvider.getPaths(params);
// }

// checkInstallationSync(params?: { ytdlp?: boolean; ffmpeg?: boolean }) {
//   return this.binaryProvider.checkInstallationSync(params);
// }

// async checkInstallation(params?: { ytdlp?: boolean; ffmpeg?: boolean }) {
//   return this.binaryProvider.checkInstallation(params);
// }
