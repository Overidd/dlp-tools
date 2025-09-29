


export class YtdlpError extends Error {

  constructor(
    public code: string,
    public message: string,
    public details?: unknown
  ) {
    super(message);
    this.name = "CustomError";
    Object.setPrototypeOf(this, YtdlpError.prototype); // fix para instanceof
  }

  static install(message: string, details?: unknown) {
    return new YtdlpError("INSTALL_ERROR", message, details);
  }

  static download(message: string, details?: unknown) {
    return new YtdlpError("DOWNLOAD_ERROR", message, details);
  }

  static exec(message: string, details?: unknown) {
    return new YtdlpError("EXEC_ERROR", message, details);
  }
}