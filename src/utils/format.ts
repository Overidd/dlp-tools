import {
  FormatAudioAndVideoOptions,
  FormatKeyWord,
  FormatManualOptions,
  FormatOptions,
  playlistOptions,
} from '../interface';

const ByQuality = {
  '2160p': 'bv*[height<=2160]',
  '1440p': 'bv*[height<=1440]',
  '1080p': 'bv*[height<=1080]',
  '720p': 'bv*[height<=720]',
  '480p': 'bv*[height<=480]',
  '360p': 'bv*[height<=360]',
  '240p': 'bv*[height<=240]',
  '144p': 'bv*[height<=133]',
  highest: 'bv*',
  lowest: 'wv*',
} as const;

const ByAudioQuality = {
  highest: 'ba',
  high: 'ba[abr>=128]',
  medium: 'ba[abr>=70]',
  low: 'ba[abr>=50]',
  lowest: 'ba[abr<50]',
} as const;

export class Format {
  static parse<T extends FormatKeyWord>(
    format?: FormatOptions<T>['format'] | string
  ): string[] {
    if (!format) return [];
    if (typeof format === 'string') return ['-f', format];
    if (Object.keys(format).length === 0) return ['-f', 'bv*+ba'];

    const { filter } = format;

    switch (filter) {
      case 'audioonly':
        return this.handleAudioOnly(format as FormatManualOptions<'audioonly'>);

      case 'videoonly':
        return this.handleVideoOnly(format as FormatManualOptions<'videoonly'>);

      case 'mergevideo':
        return this.handleMergeVideo(format as FormatManualOptions<'mergevideo'>);

      case 'audioandvideo':
        return this.handleAudioAndVideo(format as FormatAudioAndVideoOptions);

      default:
        return [];
    }
  }

  private static handleAudioOnly(format: FormatManualOptions<'audioonly'>): string[] {
    const { quality, type, playlist } = format;
    const args = [
      '-x',
      '--audio-format',
      type ?? 'mp3',
      '--audio-quality',
      quality ? quality.toString() : '5',
    ];
    return [...args, ...this.parsePlaylist(playlist)];
  }

  private static handleVideoOnly(format: FormatManualOptions<'videoonly'>): string[] {
    const { quality, type, playlist } = format;
    const videoQuality = quality && ByQuality[quality as keyof typeof ByQuality]
      ? ByQuality[quality as keyof typeof ByQuality]
      : 'bv*';
    const selector = type
      ? `${videoQuality}[acodec=none][ext=${type}]`
      : `${videoQuality}[acodec=none]`;
    return ['-f', selector, ...this.parsePlaylist(playlist)];
  }

  private static handleMergeVideo(format: FormatManualOptions<'mergevideo'>): string[] {
    const { quality, type, playlist } = format;

    const videoQuality =
      typeof quality === 'object' && quality.video
        ? ByQuality[quality.video as keyof typeof ByQuality]
        : 'bv*';

    const audioQuality =
      typeof quality === 'object' && quality.audio
        ? ByAudioQuality[quality.audio as keyof typeof ByAudioQuality]
        : 'ba';

    const safeAudioSelector =
      type === 'mp4' ? `${audioQuality}[ext=m4a]` : audioQuality;

    const args = ['-f', `${videoQuality}+${safeAudioSelector}`];
    if (type) args.push('--merge-output-format', type);

    return [...args, ...this.parsePlaylist(playlist)];
  }

  private static handleAudioAndVideo(format: FormatAudioAndVideoOptions): string[] {
    const { formatAudio, formatVideo, playlist } = format;
    const args = ['-f', `${formatVideo || 'bv*'}+${formatAudio || 'ba'}`];
    return [...args, ...this.parsePlaylist(playlist)];
  }

  private static parsePlaylist(playlist?: playlistOptions): string[] {
    if (!playlist) return [];
    const arr: string[] = [];

    if (playlist.items?.length)
      arr.push('--playlist-items', playlist.items.join(','));
    if (playlist.titleFilter?.match)
      arr.push('--match-title', playlist.titleFilter.match);
    if (playlist.titleFilter?.reject)
      arr.push('--reject-title', playlist.titleFilter.reject);

    if (playlist.ids?.include?.length) {
      const expr = playlist.ids.include.map(id => `id = '${id}'`).join(' | ');
      arr.push('--match-filter', expr);
    }

    if (playlist.ids?.exclude?.length) {
      const expr = playlist.ids.exclude.map(id => `id != '${id}'`).join(' & ');
      arr.push('--match-filter', expr);
    }

    return arr;
  }
}