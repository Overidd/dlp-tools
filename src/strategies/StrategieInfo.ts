import { CommandBuilder } from '../core';

export interface InfoStrategy {
  buildCommand(url: string, options?: any): string[];
}

export class InfoStrategyImpl implements InfoStrategy {
  buildCommand(url: string, options: any = {}): string[] {
    return new CommandBuilder()
      .setFlag('--dump-json')
      .setOptions(options)
      .activeQuiet()
      .setUrl(url)
      .build();
  }
}
