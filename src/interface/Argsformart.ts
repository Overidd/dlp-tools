import { IArgsOptions, VideoProgress } from './IArgsOptions';

export type VideoQuality =
  | '2160p'
  | '1440p'
  | '1080p'
  | '720p'
  | '480p'
  | '360p'
  | '240p'
  | '144p'
  | 'highest'
  | 'lowest';

export type AudioQuality =
  | 'highest'
  | 'high'
  | 'medium'
  | 'low'
  | 'lowest';

// Formatos de video
export type FormatIdVideo =
  | '160' // 144p
  | '133' // 240p
  | '134' // 360p
  | '135' // 480p
  | '136' // 720p
  | '137' // 1080p
  | '264' // 1440p
  | '266' // 2160p (4K)
  | '298' // 1080p60
  | '299' // 1080p60 (alto bitrate)
  | '400' // 1440p60
  | '401' // 2160p60 (4K)
  | 'bv*' // video best
  | 'wv*'; // video worst

// Formatos de audio
export type FormatIdAudio =
  | '249' // opus (50k)
  | '250' // opus (70k)
  | '251' // opus medium (160k)
  | '140' // m4a medium (128k)
  | '139' // m4a low (48k)
  | 'ba'  // best audio
  | 'wa'; // worst audio


export type TypeOptions = {
  videoonly: 'mp4' | 'webm';
  // audioandvideo: 'mp4' | 'webm';
  mergevideo: 'mkv' | 'mp4' | 'ogg' | 'webm' | 'flv';
  audioonly:
  | 'aac'
  | 'flac'
  | 'mp3'
  | 'm4a'
  | 'opus'
  | 'vorbis'
  | 'wav'
  | 'alac';
};

export interface playlistOptions {
  items?: string[];

  /** IDs a incluir o excluir */
  ids?: {
    include?: string[];
    exclude?: string[];
  };

  titleFilter?: {
    match?: string;
    reject?: string;
  };
}

// export interface FormatThumbnailOptions {
//   filter: 'thumbnail';

//   /** Descargar todas las miniaturas disponibles, no solo la principal */
//   all?: boolean;

//   /** Escoger una calidad específica (ej: 0 = más baja, -1 = más alta) */
//   quality?: number;

//   /** Convertir la miniatura a un formato diferente (jpg, png, webp) */
//   convertTo?: 'jpg' | 'png' | 'webp';

//   outputName?: string;
// }
// TODO: creo que seria mejor obtener las url y descargar con fetch y a la vez convertirlo en un formato.

export interface FormatSubtitleOptions {
  filter: 'subtitle';

  /** Idiomas de los subtítulos (pueden ser múltiples) */
  language?: string | string[];

  /** Convertir el formato del subtítulo */
  convertTo?: 'srt' | 'vtt' | 'ass' | 'lrc';

  outputName?: string;
}

export interface FormatAudioAndVideoOptions {
  filter: 'audioandvideo';
  formatVideo?: FormatIdVideo;
  formatAudio?: FormatIdAudio;
  playlist?: playlistOptions;
}

export type QualityOptions = {
  videoonly: VideoQuality;
  audioonly: AudioQuality;
  // audioandvideo: 'highest' | 'lowest';
  mergevideo: {
    video: VideoQuality;
    audio?: AudioQuality;
  };
};

export type FormatKeyWord = keyof QualityOptions;

export interface FormatManualOptions<F extends FormatKeyWord> {
  filter: F;
  quality?: QualityOptions[F];
  type?: TypeOptions[F];
  playlist?: playlistOptions;
}

export interface FormatOptions<F extends FormatKeyWord = FormatKeyWord>
  extends Omit<IArgsOptions, 'format' | 'progressTemplate'> {

  format?:
  | string
  // | FormatThumbnailOptions
  | FormatSubtitleOptions
  | FormatAudioAndVideoOptions
  | FormatManualOptions<F>;

  onProgress?: (p: VideoProgress) => void;
  onError?: (e: Error) => void;
  onEnd?: () => void;
}
