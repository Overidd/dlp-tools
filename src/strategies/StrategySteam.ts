import { CommandBuilder } from '../core';
import { FormatOptions } from '../interface';
import { PROGRESS_STRING } from '../utils';

export abstract class StrategyBase {
  protected preBuildArgs(): string[] {
    return [];
  }

  protected postBuildArgs(): string[] {
    return [];
  }

  buildCommand(url: string, ffmpegPath: string, options?: FormatOptions): string[] {
    const { format, onProgress, ...opt } = options || {};

    const command = new CommandBuilder()
      .setArgs(['--windows-filenames'])
      .setArgs(['--ffmpeg-location', ffmpegPath])
      .setArgs(['--progress-template', PROGRESS_STRING])
      .setArgs(this.preBuildArgs())
      .setOptions(opt)
      .setUrl(url)
      .build();

    return [...command, ...this.postBuildArgs()];
  }
}

export class StrategyDownload extends StrategyBase {
  protected postBuildArgs(): string[] {
    return ['-o', '%(title)s.%(ext)s'];
  }
}

export class StrategyStream extends StrategyBase {
  protected postBuildArgs(): string[] {
    return ['-o', '-'];
  }
}