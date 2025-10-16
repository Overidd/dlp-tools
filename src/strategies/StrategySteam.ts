import { CommandBuilder } from '../core';
import { FormatOptions } from '../interface';
import { PROGRESS_STRING } from '../utils';
import { Format } from '../utils/format';

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
      // .activeQuiet()
      .setArgs(['--windows-filenames'])
      .setArgs(['--ffmpeg-location', ffmpegPath])
      .setArgs(['--progress-template', PROGRESS_STRING])
      .setArgs(Format.parse(format))
      .setArgs(this.preBuildArgs())
      .setOptions(opt)
      .setUrl(url)
      .build();

    return [...command, ...this.postBuildArgs()];
  }
}

export class StrategyDownload extends StrategyBase {
  protected preBuildArgs(): string[] {
    return ['-o', '%(title)s.%(ext)s'];
  }
}

export class StrategyStream extends StrategyBase {
  protected preBuildArgs(): string[] {
    return ['-o', '-'];
  }
}