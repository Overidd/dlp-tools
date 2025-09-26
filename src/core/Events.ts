import { EventEmitter } from 'events';

export type YtDlpEvents = {
  progress: (data: string) => void;
  error: (error: Error) => void;
  complete: (info: string) => void;
  log: (message: string) => void;
};

// Tipado del progreso (ejemplo simplificado)
// export interface ProgressEvent {
//   percent: number;   // 0 - 100
//   downloaded: string; // ej. '5.3MiB'
//   total: string;      // ej. '20MiB'
//   speed: string;      // ej. '1.2MiB/s'
//   eta: string;        // ej. '00:30'
// }

// Info cuando termina la descarga
// export interface DownloadInfo {
//   filepath: string;
//   format: string;
//   size?: string;
// }

// Extendemos el EventEmitter con tipado fuerte
export class YtDlpEventEmitter extends EventEmitter {
  emit<K extends keyof YtDlpEvents>(
    event: K,
    ...args: Parameters<YtDlpEvents[K]>
  ): boolean {
    return super.emit(event, ...args);
  }

  on<K extends keyof YtDlpEvents>(
    event: K,
    listener: YtDlpEvents[K]
  ): this {
    super.on(event, listener);
    return this;
  }
}
