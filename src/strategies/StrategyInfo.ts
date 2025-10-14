import { CommandBuilder } from '../core';
import { InfoOptions } from '../interface';

export interface InfoStrategyBase {
  buildCommand(url: string, options?: any): string[];
}

export class InfoStrategy implements InfoStrategyBase {
  buildCommand(url: string, options: InfoOptions = {}): string[] {

    const optionMap = {
      'sleep.min': 'sleepInterval',
      'sleep.max': 'maxSleepInterval',
    };

    return new CommandBuilder()
      .setFlag('--dump-json', !options.dumpSingleJson)
      .setFlag('--skip-download', true)
      .setMappedOptions(options, optionMap)
      .activeQuiet()
      .setUrl(url)
      .build();
  }
}