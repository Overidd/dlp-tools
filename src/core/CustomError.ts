


export class CustomError extends Error {

  constructor(
    public code: string,
    public message: string,
    public details?: unknown
  ) {
    super(message);
    this.name = "CustomError";
    Object.setPrototypeOf(this, CustomError.prototype); // fix para instanceof
  }

  static install(message: string, details?: unknown) {
    return new CustomError("INSTALL_ERROR", message, details);
  }

  static download(message: string, details?: unknown) {
    return new CustomError("DOWNLOAD_ERROR", message, details);
  }

  static exec(message: string, details?: unknown) {
    return new CustomError("EXEC_ERROR", message, details);
  }
}