import { CommandBuilder } from '../core';


export interface StrategySteamBase {
  buildCommand(url: string, options?: any): string[];
}


export class StrategySteam implements StrategySteamBase {

  buildCommand(url: string, options?: any): string[] {

    return new CommandBuilder()
      .setFlag('--dump-json', !options.dumpSingleJson)
      .setFlag('--skip-download', true)
      .setArgs(options.args)
      .activeQuiet()
      .setUrl(url)
      .build();;
  }
}