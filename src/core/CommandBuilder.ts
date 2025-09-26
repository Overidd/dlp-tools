


export class CommandBuilder {
  private url: string = '';
  private args: string[] = [];

  setUrl(url: string): this {
    this.url = url;
    return this;
  }

  setFlag(flag: string): this {
    this.args.push(flag);
    return this;
  }

  setOutput(path: string): this {
    this.args.push('-o', path + '/%(title)s.%(ext)s');
    return this;
  }

  setArgs(args: string[]): this {
    this.args.push(...args);
    return this;
  }

  build(): string[] {
    if (!this.url) throw new Error('URL is required');
    return [this.url, ...this.args];
  }
}
