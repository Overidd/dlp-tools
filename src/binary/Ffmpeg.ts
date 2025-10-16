import path from 'path';
import fs from 'fs';
import { execSync } from 'child_process';

export class Ffmpeg {
  private readonly BIN_DIR: string;
  private readonly DOWNLOAD_BASE_URL =
    'https://github.com/iqbal-rashed/ytdlp-nodejs/releases/download/ffmpeg-latest';

  private readonly PLATFORM_MAPPINGS: Record<string, Record<string, string[]>> = {
    win32: {
      x64: ['win-x64-ffmpeg.exe', 'win-x64-ffprobe.exe'],
      ia32: ['win-ia32-ffmpeg.exe', 'win-ia32-ffprobe.exe'],
      arm64: ['win-arm64-ffmpeg.exe', 'win-arm64-ffprobe.exe'],
    },
    linux: {
      x64: ['linux-x64-ffmpeg', 'linux-x64-ffprobe'],
      arm64: ['linux-arm64-ffmpeg', 'linux-arm64-ffprobe'],
    },
    darwin: {
      x64: ['macos-x64-ffmpeg', 'macos-x64-ffprobe'],
      arm64: ['macos-arm64-ffmpeg', 'macos-arm64-ffprobe'],
    },
    android: {
      arm64: ['linux-arm64-ffmpeg', 'linux-arm64-ffprobe'],
    },
  };

  constructor(private outDir?: string) {
    this.BIN_DIR = this.outDir || path.join(__dirname, '..', 'bin');
  }

  private getBuildsArray(): string[] {
    const platform = process.platform;
    const arch = process.arch;

    const builds = this.PLATFORM_MAPPINGS[platform]?.[arch];
    if (!builds) {
      throw new Error(
        `No hay build de FFmpeg disponible para ${platform} (${arch})`
      );
    }

    return builds;
  }

  public findFFmpegBinary(): string {
    try {
      const buildsArr = this.getBuildsArray();
      if (!buildsArr.length) throw new Error();

      const ffmpegPath = path.join(
        this.BIN_DIR,
        String(buildsArr[0].split('-').pop())
      );

      if (!fs.existsSync(ffmpegPath)) {
        throw new Error('Binario de FFmpeg no encontrado. Debe descargarse primero.');
      }

      return ffmpegPath;
    } catch {
      const command = process.platform === 'win32' ? 'where ffmpeg' : 'which ffmpeg';
      return execSync(command, { encoding: 'utf8' }).trim();
    }
  }

  public async downloadFFmpeg(): Promise<string | undefined> {
    const OUT_DIR = this.BIN_DIR;
    const ffmpegBinary = this.findFFmpegBinary();

    if (ffmpegBinary) {
      return ffmpegBinary;
    }

    try {
      const buildsArr = this.getBuildsArray();
      if (!buildsArr.length) throw new Error();

      const downloadUrls = buildsArr.map((v) => `${this.DOWNLOAD_BASE_URL}/${v}`);
      const outputPaths = buildsArr.map((v) =>
        path.join(OUT_DIR, String(v.split('-').pop()))
      );

      if (!fs.existsSync(OUT_DIR)) {
        fs.mkdirSync(OUT_DIR, { recursive: true });
      }

      console.log('Descargando FFmpeg y FFprobe...');

      for (let i = 0; i < buildsArr.length; i++) {
        const downloadUrl = downloadUrls[i];
        const outputPath = outputPaths[i];
        console.log('Descargando...', path.basename(downloadUrl));
        // await this.downloadFile(downloadUrl, outputPath);
      }

      try {
        for (const outputPath of outputPaths) {
          fs.chmodSync(outputPath, 0o755);
        }
      } catch {
        console.log('Nota: No se pudieron establecer permisos ejecutables (Windows)');
      }

      return this.findFFmpegBinary();
    } catch (error) {
      console.error(`Error al descargar FFmpeg: ${error}`);
      throw error;
    }
  }
}
