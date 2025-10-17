import { CommandBuilder } from '../core';
import { IArgsOptions } from '../interface';

interface ExecStrategyBase {
  buildCommand(url: string, options?: any): string[]
}

export class ExecStrategy implements ExecStrategyBase {

  buildCommand(url: string, options?: IArgsOptions): string[] {
    return new CommandBuilder()
      .setOptions(options ?? {})
      .setUrl(url)
      .build();
  }

}


