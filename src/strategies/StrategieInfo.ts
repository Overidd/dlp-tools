import { CommandBuilder } from '../core';
import { InfoOptions } from '../interface';

export interface InfoStrategy {
  buildCommand(url: string, options?: any): string[];
}

export class InfoStrategyImpl implements InfoStrategy {
  buildCommand(url: string, options: InfoOptions = {}): string[] {

    return new CommandBuilder()
      .setFlag('--dump-json', !options.dumpSingleJson)
      .setOptions(options)
      .activeQuiet()
      .setUrl(url)
      .build();
  }
}