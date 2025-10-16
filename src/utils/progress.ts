import { VideoProgress } from '../interface';

export const PROGRESS_STRING =
  'bright-{"id":"%(info.id)s","filename":"%(info.filename|escape)s","percent":"{progress._percent_str}","status":"%(progress.status)s","downloaded":"%(progress.downloaded_bytes)s","total":"%(progress.total_bytes)s","total_estimate":"%(progress.total_bytes_estimate)s","speed":"%(progress.speed)s","eta":"%(progress.eta)s"}';

export class VideoProgressUtils {
  static formatBytes(bytes: string | number, decimals = 2): string {
    const newBytes = Number(bytes);

    if (newBytes === 0 || isNaN(newBytes)) return newBytes + ' Bytes';

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

    const i = Math.floor(Math.log(newBytes) / Math.log(k));

    return parseFloat((newBytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }

  private static toFixedNumber(num: number, digits: number, base?: number): number {
    const pow = Math.pow(base || 10, digits);
    return Math.round(num * pow) / pow;
  }

  static percentage(partialValue: string | number, totalValue: string | number): number {
    return this.toFixedNumber((100 * Number(partialValue)) / Number(totalValue), 2);
  }

  static secondsToHms(d: number | string): string {
    d = Number(d);
    const h = Math.floor(d / 3600);
    const m = Math.floor((d % 3600) / 60);
    const s = Math.floor((d % 3600) % 60);

    const hDisplay = h > 0 ? h + (h == 1 ? ' hour, ' : ' hours, ') : '';
    const mDisplay = m > 0 ? m + (m == 1 ? ' minute, ' : ' minutes, ') : '';
    const sDisplay = s >= 0 ? s + (s == 1 ? ' second' : ' seconds') : '';
    return hDisplay + mDisplay + sDisplay;
  }

  static stringToProgress(str: string): VideoProgress | undefined {
    try {
      if (!str.includes('bright')) throw new Error();

      const jsonStr = str.replace('bright-', '').trim();

      if (!jsonStr) throw new Error();

      const object = JSON.parse(jsonStr);

      const total = isNaN(Number(object.total))
        ? Number(object.total_estimate)
        : Number(object.total);

      return {
        id: object.id,
        filename: object.filename,
        status: object.status,
        // percent: object.percent,
        downloaded: Number(object.downloaded),
        downloaded_str: this.formatBytes(object.downloaded),
        total: total,
        total_str: this.formatBytes(total),
        speed: Number(object.speed),
        speed_str: this.formatBytes(object.speed) + '/s',
        eta: Number(object.eta),
        eta_str: this.secondsToHms(object.eta),
        percent: this.percentage(object.downloaded, total),
        percent_str: this.percentage(object.downloaded, total) + '%',
      };
    } catch {
      return undefined;
    }
  }
}
