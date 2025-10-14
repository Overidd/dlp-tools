import { ChildProcessWithoutNullStreams } from "node:child_process";

export interface IArgsOptions {

  sleep?: {
    min?: number;
    max?: number;
  }
  // General Options
  printHelp?: boolean;
  printVersion?: boolean;
  update?: boolean;
  noUpdate?: boolean;
  updateTo?: string;
  ignoreErrors?: boolean;
  noAbortOnError?: boolean;
  abortOnError?: boolean;
  dumpUserAgent?: boolean;
  listExtractors?: boolean;
  extractorDescriptions?: boolean;
  useExtractors?: string[];
  defaultSearch?: string;
  ignoreConfig?: boolean;
  noConfigLocations?: boolean;
  configLocations?: string[];
  pluginDirs?: string[];
  noPluginDirs?: boolean;
  flatPlaylist?: boolean;
  noFlatPlaylist?: boolean;
  liveFromStart?: boolean;
  noLiveFromStart?: boolean;
  waitForVideo?: number;
  noWaitForVideo?: boolean;
  markWatched?: boolean;
  noMarkWatched?: boolean;
  color?: string;
  compatOptions?: string[];
  aliases?: string[];

  // Network Options
  proxy?: string;
  socketTimeout?: number;
  sourceAddress?: string;
  forceIpv4?: boolean;
  forceIpv6?: boolean;
  impersonate?: string[];
  listImpersonateTargets?: boolean;
  enableFileUrls?: boolean;

  // Geo-restriction
  geoVerificationProxy?: string;
  xff?: string;

  // Video Selection
  playlistItems?: string;
  minFilesize?: string;
  maxFilesize?: string;
  date?: string;
  dateBefore?: string;
  dateAfter?: string;
  matchFilter?: string;
  noMatchFilters?: boolean;
  breakMatchFilters?: string;
  noBreakMatchFilters?: boolean;
  noPlaylist?: boolean;
  yesPlaylist?: boolean;
  ageLimit?: number;
  downloadArchive?: string;
  noDownloadArchive?: boolean;
  maxDownloads?: number;
  breakOnExisting?: boolean;
  noBreakOnExisting?: boolean;
  breakPerInput?: boolean;
  noBreakPerInput?: boolean;
  skipPlaylistAfterErrors?: number;

  // Download Options
  concurrentFragments?: number;
  throttledRate?: string;
  fileAccessRetries?: number;
  retrySleep?: number;
  noKeepFragments?: boolean;
  resizeBuffer?: boolean;
  noResizeBuffer?: boolean;
  lazyPlaylist?: boolean;
  noLazyPlaylist?: boolean;
  noHlsUseMpegts?: boolean;
  downloadSections?: string;
  downloader?: string;
  downloaderArgs?: string;

  playlistStart?: number;
  playlistEnd?: number;

  matchTitle?: string;
  rejectTitle?: string;
  includeAds?: boolean;
  limitRate?: string;

  breakOnReject?: boolean;

  noDownload?: boolean;
  playlistReverse?: boolean;
  playlistRandom?: boolean;
  xattrSetFilesize?: boolean;
  hlsSplitDiscontinuity?: boolean;

  geoBypass?: boolean;
  geoBypassCountry?: string;
  geoBypassIpBlock?: string;

  batchFile?: string;

  // Download Options
  retries?: number;
  fragmentRetries?: number;
  skipUnavailableFragments?: boolean;
  abortOnUnavailableFragment?: boolean;
  keepFragments?: boolean;
  bufferSize?: string;
  noResumeDl?: boolean;
  continueDownload?: boolean;
  noContinue?: boolean;

  cookiesFromBrowser?: string;
  noCookies?: boolean;
  extractorRetries?: number;
  allowDynamicMpd?: boolean;
  hlsUseMpegts?: boolean;
  httpChunkSize?: string;

  // Filesystem Options
  trimFileNames?: number;
  noRestrictFilenames?: boolean;
  noWindowsFilenames?: boolean;
  continue?: boolean;

  part?: boolean;
  noPart?: boolean;
  mtime?: boolean;
  noMtime?: boolean;
  writeDescription?: boolean;
  noWriteDescription?: boolean;
  writeInfoJson?: boolean;
  noWriteInfoJson?: boolean;
  writePlaylistMetafiles?: boolean;
  noWritePlaylistMetafiles?: boolean;
  cleanInfoJson?: boolean;
  noCleanInfoJson?: boolean;
  writeComments?: boolean;
  noWriteComments?: boolean;
  loadInfoJson?: string;
  cookies?: string;

  noCookiesFromBrowser?: boolean;
  cacheDir?: string;
  noCacheDir?: boolean;
  rmCacheDir?: boolean;
  paths?: { [key: string]: string } | string;
  output?: string;
  outputNaPlaceholder?: string;
  restrictFilenames?: boolean;
  windowsFilenames?: boolean;
  noOverwrites?: boolean;
  forceOverwrites?: boolean;
  noForceOverwrites?: boolean;
  autonumberStart?: number;
  noPartFiles?: boolean;

  noBatchFile?: boolean;

  // Thumbnail Options
  writeThumbnail?: boolean;
  writeAllThumbnails?: boolean;
  noWriteThumbnails?: boolean;
  convertThumbnails?: string;

  // Internet Shortcut Options
  writeLink?: boolean;
  writeUrlLink?: boolean;
  writeWeblocLink?: boolean;
  writeLnkLink?: boolean;
  writeDesktopLink?: boolean;

  // Verbosity and Simulation Options
  quiet?: boolean;
  noWarnings?: boolean;
  simulate?: boolean;
  noSimulate?: boolean;
  ignoreNoFormatsError?: boolean;
  ignoreEoFError?: boolean;
  noIgnoreEoFError?: boolean;

  noColor?: boolean;
  printTraffic?: boolean;
  consoleTitle?: boolean;
  verbose?: boolean;
  noQuiet?: boolean;
  noIgnoreNoFormatsError?: boolean;
  noProgress?: boolean;
  progress?: boolean;

  dumpSingleJson?: boolean;
  dumpJson?: boolean;
  printJson?: boolean;
  skipDownload?: boolean;
  print?: string;
  printToFile?: string;
  forceWriteArchive?: boolean;
  newline?: boolean;
  progressTemplate?: string;
  progressDelta?: number;

  // Workarounds
  encoding?: string;
  legacyServerConnect?: boolean;
  noCheckCertificates?: boolean;
  preferInsecure?: boolean;
  addHeaders?: { [key: string]: string };
  binPath?: string;
  // Workaround Options
  bidiWorkaround?: boolean;
  sleepRequests?: number;
  sleepInterval?: number;
  maxSleepInterval?: number;
  sleepSubtitles?: number;

  // Video Format Options
  format?: string;
  formatSort?: string[];
  formatSortForce?: boolean;
  noFormatSortForce?: boolean;
  audioFormat?: string;
  videoFormat?: string;
  preferFreeFormats?: boolean;
  noPreferFreeFormats?: boolean;
  ytdlpForceKeyframes?: boolean;
  mergeOutputFormat?: string;
  videoMultiStreams?: boolean;
  noVideoMultiStreams?: boolean;
  audioMultiStreams?: boolean;
  noAudioMultiStreams?: boolean;
  checkFormats?: boolean;
  checkAllFormats?: boolean;
  noCheckFormats?: boolean;

  // Subtitle Options
  writeSubs?: boolean;
  writeAutoSubs?: boolean;
  writeAllSubs?: boolean;
  noWriteSubs?: boolean;
  listSubs?: boolean;
  subFormat?: string;
  subLangs?: string[];

  // Authentication Options
  username?: string;
  password?: string;
  twoFactor?: string;
  netrc?: boolean;
  videoPassword?: string;
  netrcLocation?: string;
  netrcCmd?: string;
  apListMso?: boolean;
  clientCertificate?: string;
  clientCertificateKey?: string;
  clientCertificatePassword?: string;

  // Adobe Pass Options
  apMso?: string;
  apUsername?: string;
  apPassword?: string;

  // Post-Processing Options
  extractAudio?: boolean;

  audioQuality?: string;
  remuxVideo?: string;
  recodeVideo?: string;
  postprocessorArgs?: { [key: string]: string[] };
  keepVideo?: boolean;
  noKeepVideo?: boolean;
  postOverwrites?: boolean;
  noPostOverwrites?: boolean;
  embedSubs?: boolean;
  noEmbedSubs?: boolean;
  embedThumbnail?: boolean;
  noEmbedThumbnail?: boolean;
  embedMetadata?: boolean;
  noEmbedMetadata?: boolean;
  embedChapters?: boolean;
  noEmbedChapters?: boolean;
  embedInfoJson?: boolean;
  noEmbedInfoJson?: boolean;
  parseMetadata?: { [key: string]: string };
  replaceInMetadata?: { [key: string]: [string, string] };
  xattrs?: boolean;
  concatPlaylist?: string;
  fixup?: string;
  ffmpegLocation?: string;
  exec?: string;
  noExec?: boolean;
  convertSubs?: string;
  splitChapters?: boolean;
  noSplitChapters?: boolean;
  removeChapters?: string;
  noRemoveChapters?: boolean;
  forceKeyframesAtCuts?: boolean;
  noForceKeyframesAtCuts?: boolean;
  usePostProcessor?: string[];

  // SponsorBlock Options
  sponsorblockMark?: string[];
  sponsorblockRemove?: string[];
  sponsorblockChapterTitle?: string;
  noSponsorblock?: boolean;
  sponsorblockApi?: string;

  // Extractor Options

  extractorArgs?: { [key: string]: string[] };

  ignoreDynamicMpd?: boolean;
  dumpPages?: boolean;

  noHlsSplitDiscontinuity?: boolean;

  // Debug Options
  referer?: string;
  userAgent?: string;

  headers?: { [key: string]: string };
  debugPrintCommandLine?: boolean;

  // Information Options

  writePages?: boolean; // --write-pages

  // Standard Options
  // listFormats?: boolean; // -F, --list-formats
  listThumbnails?: boolean; // --list-thumbnails

  // Additional raw options
  additionalOptions?: string[];
}

export interface YtDlpOptions {
  binaryPath?: string;
  ffmpegPath?: string;
}

export interface VideoInfo {
  id: string;
  title: string;
  formats: VideoFormat[];
  thumbnails: VideoThumbnail[];
  thumbnail: string;
  description: string;
  upload_date: string;
  uploader: string;
  uploader_id: string;
  uploader_url: string;
  channel_id: string;
  channel_url: string;
  duration: number;
  view_count: number;

  categories: string[];
  tags: string[];
  subtitles: Subtitles;
  automatic_captions: Subtitles;
  _type: 'video';

  average_rating: number;
  age_limit: number;
  webpage_url: string;
  playable_in_embed: boolean;
  live_status: string;
  media_type: object;
  release_timestamp: object;
  _format_sort_fields: object;
  comment_count: number;
  chapters: { start_time: number; title: string; end_time: number }[];
  heatmap: object;
  like_count: number;
  channel: string;
  channel_follower_count: number;
  channel_is_verified: boolean;
  timestamp: number;
  availability: string;
  original_url: string;
  webpage_url_basename: string;
  webpage_url_domain: string;
  extractor: string;
  extractor_key: string;
  playlist: object;
  playlist_index: object;
  display_id: string;
  fulltitle: string;
  duration_string: string;
  release_year: object;
  is_live: boolean;
  was_live: boolean;
  requested_subtitles: object;
  _has_drm: object;
  epoch: number;
  requested_downloads: object[];
  asr: number;
  filesize: number;
  format_id: string;
  format_note: string;
  source_preference: number;
  fps: number;
  audio_channels: number;
  height: number;
  quality: number;
  has_drm: boolean;
  tbr: number;
  filesize_approx: number;
  url: string;
  width: number;
  language: string;
  language_preference: number;
  preference: object;
  ext: string;
  vcodec: string;
  acodec: string;
  dynamic_range: string;
  downloader_options: {
    [v: string]: string | number;
  };
  protocol: string;
  video_ext: string;
  audio_ext: string;
  vbr: object;
  abr: object;
  resolution: string;
  aspect_ratio: number;
  http_headers: {
    [v: string]: string;
  };
  format: string;
  _version: object;
}

interface Subtitles {
  [k: string]: { ext: string; url: string; name: string }[];
}

export interface FlatVideoInfo {
  id: string;
  _type: 'playlist';
  entries: { id: string; url: string }[];
}

export interface PlaylistInfo {
  id: string;
  title: string;
  _type: 'playlist';
  entries: VideoInfo[];
  webpage_url: string;
  original_url: string;
  webpage_url_basename: string;
  webpage_url_domain: null | string;
  extractor: string;
  extractor_key: string;
  release_year: null | string;
  playlist_count: number;
  epoch: number;
}

export interface FlatPlayList {
  _type: string;
  ie_key: string;
  id: string;
  url: string;
  title: string;
  description: null;
  duration: number;
  channel_id: string;
  channel: string;
  channel_url: string;
  uploader: string;
  uploader_id: null;
  uploader_url: null;
  thumbnails: Thumbnail[];
  timestamp: null;
  release_timestamp: null;
  availability: null;
  view_count: null;
  live_status: null;
  channel_is_verified: null;
  __x_forwarded_for_ip: null;
  webpage_url: string;
  original_url: string;
  webpage_url_basename: string;
  webpage_url_domain: string;
  extractor: string;
  extractor_key: string;
  playlist_count: number;
  playlist: string;
  playlist_id: string;
  playlist_title: string;
  playlist_uploader: null;
  playlist_uploader_id: null;
  playlist_channel: null;
  playlist_channel_id: null;
  playlist_webpage_url: string;
  n_entries: number;
  playlist_index: number;
  __last_playlist_index: number;
  playlist_autonumber: number;
  epoch: number;
  duration_string: string;
  release_year: null;
  _version: Version;
}

export interface Version {
  version: string;
  current_git_head: null;
  release_git_head: string;
  repository: string;
}

export interface Thumbnail {
  url: string;
  height: number;
  width: number;
}


export interface VideoThumbnail {
  id: number;
  width?: string | number;
  height?: string | number;
  url: string;
}

export interface VideoFormat {
  format_id: string;
  format_note?: string;
  ext: string;
  url: string;
  width?: number;
  height?: number;
  resolution?: string;
  filesize?: number;
  tbr?: number;
  protocol: string;
  vcodec: string;
  acodec: string;
}

export interface VideoProgress {
  status: 'downloading' | 'finished';
  downloaded: number;
  downloaded_str: string;
  total: number;
  total_str: string;
  speed: number;
  speed_str: string;
  eta: number;
  eta_str: string;
  percentage: number;
  percentage_str: string;
}

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

// 🎬 Formatos de video comunes
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

// 🎧 Formatos de audio comunes
export type FormatIdAudio =
  | '249' // webm tiny (50k)
  | '250' // webm tiny (70k)
  | '251' // webm medium (160k)
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

export interface PipeResponse extends ChildProcessWithoutNullStreams {

  promise: Promise<string>;

  pipe: (
    destination: NodeJS.WritableStream,
    options?: {
      end?: boolean;
    }
  ) => Promise<NodeJS.WritableStream>;

  pipeSync: (
    destination: NodeJS.WritableStream,
    options?: {
      end?: boolean;
    }
  ) => NodeJS.WritableStream;
};

export interface FileMetadata {
  name: string;
  type: string;
  size?: number;
}

export interface GetFileOptions<F extends FormatKeyWord>
  extends FormatOptions<F> {
  filename?: string;
  metadata?: FileMetadata;
}

//* ============== 
/**
 * Opciones base (comunes en cualquier modo).
 */
interface InfoOptionsBase {
  /** Incluir todos los formatos disponibles (`--list-formats`). */
  listFormats?: boolean;

  /** Cookies manuales en string. */
  cookies?: string;

  /** Cookies desde navegador (ej: "chrome", "firefox"). */
  cookiesFromBrowser?: string;

  /** Desactiva cookies del navegador. */
  noCookiesFromBrowser?: boolean;

  /** Desactiva todas las cookies. */
  noCookies?: boolean;

  /** Esperar entre peticiones. */
  sleep?: {

    /** Mínimo de segundos a esperar entre peticiones. */
    min?: number;

    /** Máximo de segundos a esperar entre peticiones.*/
    max?: number;
  }
}

/**
 * Caso 1: Procesar cada video con un JSON independiente.
 */
export interface InfoOptionsPerVideo extends InfoOptionsBase {
  dumpSingleJson?: false;

  flatPlaylist?: false;

  noPlaylist?: false;
}

/**
 * Caso 3: Toda la playlist en un único JSON completo.
 */
export interface InfoOptionsSingleJson extends InfoOptionsBase {
  /**
   * Solo se aplica en playlist
   */
  dumpSingleJson: true;

  flatPlaylist?: boolean;

  noPlaylist?: false;
}

// Caso 4: Lista plana (solo IDs/URLs básicos) de ingleJson.
export interface InfoOptionsSingleFlat extends InfoOptionsBase {
  /**
   * Solo se aplica en playlist
   */
  dumpSingleJson?: boolean;

  /** Si es `true`, devuelve una lista plana con info limitada de la playlist. */
  flatPlaylist: true;

  noPlaylist?: false;
}

export interface InfoIgnorePlaylist extends InfoOptionsBase {
  /**
   * Ignora la playlist
   */
  noPlaylist?: true;

  dumpSingleJson?: false;
  flatPlaylist?: false;
}


// Unión de opciones
export type InfoOptions =
  | InfoOptionsPerVideo
  | InfoOptionsSingleJson
  | InfoOptionsSingleFlat;

// Inferencia condicional
export type InfoResult<T> =
  T extends InfoOptionsPerVideo ? InfoResultMap["VideoInfo"] :
  T extends InfoOptionsSingleJson ? InfoResultMap["dumpSingleJson"] :
  T extends InfoOptionsSingleFlat ? InfoResultMap["flatPlaylist"] :
  T extends InfoIgnorePlaylist ? InfoResultMap["VideoInfo"] :
  never

interface InfoResultMap {

  VideoInfo: VideoInfo | {
    id: string;
    _type: string;
    entries: VideoInfo[];
  };

  dumpSingleJson: PlaylistInfo;

  flatPlaylist: {
    id: string;
    _type: string;
    entries: FlatPlayList[];
  };
}