import { IArgsOptions } from '../interface';

export class CommandBuilder {
  private url: string = '';
  private args: string[] = [];
  private options: IArgsOptions & Record<string, any> = {};

  setUrl(url: string): this {
    this.url = url;
    return this;
  }

  setFlag(flag: string, isActive?: boolean): this {
    if (isActive) this.args.push(flag);
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

  activeQuiet(): this {
    this.args.push('--quiet');
    return this;
  }

  setMappedOptions(options: Record<string, any>, map: Record<string, string>): this {
    this.options = { ...this.options, ...options };

    for (const [path, flag] of Object.entries(map)) {

      const value = path.split('.').reduce((acc, key) => acc?.[key], options);

      if (value !== undefined) {
        this.options[flag] = value;
      }
    }

    return this;
  }

  setOptions(options: IArgsOptions): this {
    this.options = options;
    return this;
  }

  build(): string[] {
    if (!this.url) throw new Error('URL is required');

    if (this.options.printHelp) this.args.push('--help');
    if (this.options.printVersion) this.args.push('--version');
    if (this.options.update) this.args.push('--update');
    if (this.options.noUpdate) this.args.push('--no-update');
    if (this.options.updateTo) this.args.push('--update-to', this.options.updateTo);
    if (this.options.ignoreErrors) this.args.push('--ignore-errors');
    if (this.options.noAbortOnError) this.args.push('--no-abort-on-error');
    if (this.options.abortOnError) this.args.push('--abort-on-error');
    if (this.options.dumpUserAgent) this.args.push('--dump-user-agent');
    if (this.options.listExtractors) this.args.push('--list-extractors');
    if (this.options.extractorDescriptions) this.args.push('--extractor-descriptions');

    if (this.options.useExtractors && this.options.useExtractors.length > 0) {
      this.args.push('--use-extractors', this.options.useExtractors.join(','));
    }
    if (this.options.defaultSearch)
      this.args.push('--default-search', this.options.defaultSearch);

    if (this.options.ignoreConfig) this.args.push('--ignore-config');
    if (this.options.noConfigLocations) this.args.push('--no-config-location');

    if (this.options.configLocations && this.options.configLocations.length > 0)
      this.args.push('--config-locations', ...this.options.configLocations);

    if (this.options.pluginDirs && this.options.pluginDirs.length > 0) {
      for (const dir of this.options.pluginDirs) {
        this.args.push('--plugin-dirs', dir);
      }
    }
    if (this.options.noPluginDirs) this.args.push('--no-plugin-dirs');
    if (this.options.flatPlaylist) this.args.push('--flat-playlist');

    if (this.options.noFlatPlaylist) this.args.push('--no-flat-playlist');

    if (this.options.liveFromStart) this.args.push('--live-from-start');
    if (this.options.noLiveFromStart) this.args.push('--no-live-from-start');

    if (this.options.waitForVideo)
      this.args.push('--wait-for-video', this.options.waitForVideo.toString());
    if (this.options.noWaitForVideo) this.args.push('--no-wait-for-video');
    if (this.options.markWatched) this.args.push('--mark-watched');
    if (this.options.noMarkWatched) this.args.push('--no-mark-watched');
    if (this.options.color) this.args.push('--color', this.options.color);

    if (this.options.compatOptions && this.options.compatOptions.length > 0) {
      this.args.push('--compat-options', this.options.compatOptions.join(','));
    }

    if (this.options.aliases && this.options.aliases.length > 0) {
      this.args.push('--alias', ...this.options.aliases);
    }

    // Network Options
    if (this.options.proxy) this.args.push('--proxy', this.options.proxy);
    if (this.options.socketTimeout)
      this.args.push('--socket-timeout', this.options.socketTimeout.toString());
    if (this.options.sourceAddress)
      this.args.push('--source-address', this.options.sourceAddress);

    if (this.options.impersonate && this.options.impersonate.length > 0)
      this.args.push('--impersonate', this.options.impersonate.join(','));

    if (this.options.listImpersonateTargets) this.args.push('--list-impersonate-targets');

    if (this.options.forceIpv4) this.args.push('--force-ipv4');
    if (this.options.forceIpv6) this.args.push('--force-ipv6');

    if (this.options.enableFileUrls) this.args.push('--enable-file-urls');

    // Geo-restriction
    if (this.options.geoVerificationProxy)
      this.args.push('--geo-verification-proxy', this.options.geoVerificationProxy);
    if (this.options.xff) this.args.push('--xff', this.options.xff);

    // Video Selection
    if (this.options.playlistItems)
      this.args.push('--playlist-items', this.options.playlistItems);
    if (this.options.minFilesize) this.args.push('--min-filesize', this.options.minFilesize);
    if (this.options.maxFilesize) this.args.push('--max-filesize', this.options.maxFilesize);
    if (this.options.date) this.args.push('--date', this.options.date);
    if (this.options.dateBefore) this.args.push('--datebefore', this.options.dateBefore);
    if (this.options.dateAfter) this.args.push('--dateafter', this.options.dateAfter);
    if (this.options.matchFilter) this.args.push('--match-filter', this.options.matchFilter);
    if (this.options.noMatchFilters) this.args.push('--no-match-filters');
    if (this.options.breakMatchFilters)
      this.args.push('--break-match-filters', this.options.breakMatchFilters);
    if (this.options.noBreakMatchFilters) this.args.push('--no-break-match-filters');
    if (this.options.noPlaylist) this.args.push('--no-playlist');
    if (this.options.yesPlaylist) this.args.push('--yes-playlist');
    if (this.options.ageLimit) this.args.push('--age-limit', this.options.ageLimit.toString());
    if (this.options.downloadArchive)
      this.args.push('--download-archive', this.options.downloadArchive);
    if (this.options.noDownloadArchive) this.args.push('--no-download-archive');
    if (this.options.maxDownloads)
      this.args.push('--max-downloads', this.options.maxDownloads.toString());
    if (this.options.breakOnExisting) this.args.push('--break-on-existing');
    if (this.options.noBreakOnExisting) this.args.push('--no-break-on-existing');
    if (this.options.breakPerInput) this.args.push('--break-per-input');
    if (this.options.noBreakPerInput) this.args.push('--break-per-input');
    if (this.options.skipPlaylistAfterErrors)
      this.args.push(
        '--skip-playlist-after-errors',
        this.options.skipPlaylistAfterErrors.toString()
      );

    // Download Options
    if (this.options.concurrentFragments)
      this.args.push('--concurrent-fragments', this.options.concurrentFragments.toString());
    if (this.options.limitRate) this.args.push('--limit-rate', this.options.limitRate);
    if (this.options.throttledRate)
      this.args.push('--throttled-rate', this.options.throttledRate);
    if (this.options.retries) this.args.push('--retries', this.options.retries.toString());
    if (this.options.fileAccessRetries)
      this.args.push('--file-access-retries', this.options.fileAccessRetries.toString());

    if (this.options.fragmentRetries)
      this.args.push('--fragment-retries', this.options.fragmentRetries.toString());

    if (this.options.retrySleep)
      this.args.push('--retry-sleep', this.options.retrySleep.toString());
    if (this.options.skipUnavailableFragments)
      this.args.push('--skip-unavailable-fragments');
    if (this.options.abortOnUnavailableFragment)
      this.args.push('--abort-on-unavailable-fragment');

    if (this.options.keepFragments) this.args.push('--keep-fragments');
    if (this.options.noKeepFragments) this.args.push('--no-keep-fragments');
    if (this.options.bufferSize) this.args.push('--buffer-size', this.options.bufferSize);
    if (this.options.resizeBuffer) this.args.push('--resize-buffer');
    if (this.options.noResizeBuffer) this.args.push('--no-resize-buffer');
    if (this.options.httpChunkSize)
      this.args.push('--http-chunk-size', this.options.httpChunkSize);
    if (this.options.playlistRandom) this.args.push('--playlist-random');
    if (this.options.lazyPlaylist) this.args.push('--lazy-playlist');
    if (this.options.noLazyPlaylist) this.args.push('--no-lazy-playlist');
    if (this.options.xattrSetFilesize) this.args.push('--xattr-set-filesize');
    if (this.options.hlsUseMpegts) this.args.push('--hls-use-mpegts');
    if (this.options.noHlsUseMpegts) this.args.push('--no-hls-use-mpegts');
    if (this.options.downloadSections)
      this.args.push('--download-sections', this.options.downloadSections.toString());
    if (this.options.downloader) this.args.push('--downloader', this.options.downloader);
    if (this.options.downloaderArgs)
      this.args.push('--downloader-args', this.options.downloaderArgs);

    // Filesystem Options
    if (this.options.batchFile) this.args.push('--batch-file', this.options.batchFile);
    if (this.options.noBatchFile) this.args.push('--no-batch-file');
    if (this.options.paths) {
      if (typeof this.options.paths === 'string') {
        this.args.push('--paths', this.options.paths);
      } else {
        for (const [key, value] of Object.entries(this.options.paths)) {
          this.args.push('--paths', `${key}:${value}`);
        }
      }
    }
    if (this.options.output) this.args.push('-o', this.options.output);
    if (this.options.outputNaPlaceholder)
      this.args.push('--output-na-placeholder', this.options.outputNaPlaceholder);
    if (this.options.restrictFilenames) this.args.push('--restrict-filenames');
    if (this.options.noRestrictFilenames) this.args.push('--no-restrict-filenames');
    if (this.options.windowsFilenames) this.args.push('--windows-filenames');
    if (this.options.noWindowsFilenames) this.args.push('--no-windows-filenames');
    if (this.options.trimFileNames)
      this.args.push('--trim-file-names', this.options.trimFileNames.toString());
    if (this.options.noOverwrites) this.args.push('--no-overwrites');
    if (this.options.forceOverwrites) this.args.push('--force-overwrites');
    if (this.options.noForceOverwrites) this.args.push('--no-force-overwrites');
    if (this.options.continue) this.args.push('--continue');
    if (this.options.noContinue) this.args.push('--no-continue');
    if (this.options.part) this.args.push('--part');
    if (this.options.noPart) this.args.push('--no-part');
    if (this.options.mtime) this.args.push('--mtime');
    if (this.options.noMtime) this.args.push('--no-mtime');
    if (this.options.writeDescription) this.args.push('--write-description');
    if (this.options.noWriteDescription) this.args.push('--no-write-description');
    if (this.options.writeInfoJson) this.args.push('--write-info-json');
    if (this.options.noWriteInfoJson) this.args.push('--no-write-info-json');
    if (this.options.writePlaylistMetafiles) this.args.push('--write-playlist-metafiles');
    if (this.options.noWritePlaylistMetafiles)
      this.args.push('--no-write-playlist-metafiles');
    if (this.options.cleanInfoJson) this.args.push('--clean-info-json');
    if (this.options.noCleanInfoJson) this.args.push('--no-clean-info-json');
    if (this.options.writeComments) this.args.push('--write-comments');
    if (this.options.noWriteComments) this.args.push('--no-write-comments');
    if (this.options.loadInfoJson)
      this.args.push('--load-info-json', this.options.loadInfoJson.toString());
    if (this.options.cookies) this.args.push('--cookies', this.options.cookies);
    if (this.options.noCookies) this.args.push('--no-cookies');
    if (this.options.cookiesFromBrowser)
      this.args.push('--cookies-from-browser', this.options.cookiesFromBrowser);
    if (this.options.noCookiesFromBrowser) this.args.push('--no-cookies-from-browser');
    if (this.options.cacheDir) this.args.push('--cache-dir', this.options.cacheDir);
    if (this.options.noCacheDir) this.args.push('--no-cache-dir');
    if (this.options.rmCacheDir) this.args.push('--rm-cache-dir');

    // Thumbnail Options
    if (this.options.writeThumbnail) this.args.push('--write-thumbnail');
    if (this.options.noWriteThumbnails) this.args.push('--no-write-thumbnails');
    if (this.options.writeAllThumbnails) this.args.push('--write-all-thumbnails');
    if (this.options.listThumbnails) this.args.push('--list-thumbnails');

    // Internet Shortcut Options
    if (this.options.writeLink) this.args.push('--write-link');
    if (this.options.writeUrlLink) this.args.push('--write-url-link');
    if (this.options.writeWeblocLink) this.args.push('--write-webloc-link');
    if (this.options.writeDesktopLink) this.args.push('--write-desktop-link');

    // Verbosity and Simulation Options
    if (this.options.quiet) this.args.push('--quiet');
    if (this.options.noQuiet) this.args.push('--no-quiet');
    if (this.options.noWarnings) this.args.push('--no-warnings');
    if (this.options.simulate) this.args.push('--simulate');
    if (this.options.noSimulate) this.args.push('--no-simulate');
    if (this.options.ignoreNoFormatsError) this.args.push('--ignore-no-formats-error');
    if (this.options.noIgnoreNoFormatsError) this.args.push('--no-ignore-no-formats-error');
    if (this.options.skipDownload) this.args.push('--skip-download');
    if (this.options.print) this.args.push('--print', this.options.print);
    if (this.options.printToFile) this.args.push('--print-to-file', this.options.printToFile);
    if (this.options.dumpJson) this.args.push('--dump-json');
    if (this.options.dumpSingleJson) this.args.push('--dump-single-json');
    if (this.options.forceWriteArchive) this.args.push('--force-write-archive');
    if (this.options.newline) this.args.push('--newline');
    if (this.options.noProgress) this.args.push('--no-progress');
    if (this.options.progress) this.args.push('--progress');
    if (this.options.consoleTitle) this.args.push('--console-title');
    if (this.options.progressTemplate)
      this.args.push('--progress-template', this.options.progressTemplate);
    if (this.options.progressDelta)
      this.args.push('--progress-delta', this.options.progressDelta.toString());
    if (this.options.verbose) this.args.push('--verbose');
    if (this.options.dumpPages) this.args.push('--dump-pages');
    if (this.options.writePages) this.args.push('--write-pages');
    if (this.options.printTraffic) this.args.push('--print-traffic');

    // Workarounds
    if (this.options.encoding) this.args.push('--encoding', this.options.encoding);
    if (this.options.legacyServerConnect) this.args.push('--legacy-server-connect');
    if (this.options.noCheckCertificates) this.args.push('--no-check-certificates');
    if (this.options.preferInsecure) this.args.push('--prefer-insecure');
    if (this.options.addHeaders) {
      for (const [key, value] of Object.entries(this.options.addHeaders)) {
        this.args.push('--add-headers', `${key}:${value}`);
      }
    }
    if (this.options.bidiWorkaround) this.args.push('--bidi-workaround');
    if (this.options.sleepRequests)
      this.args.push('--sleep-requests', this.options.sleepRequests.toString());
    if (this.options.sleepInterval)
      this.args.push('--sleep-interval', this.options.sleepInterval.toString());
    if (this.options.maxSleepInterval)
      this.args.push('--max-sleep-interval', this.options.maxSleepInterval.toString());
    if (this.options.sleepSubtitles)
      this.args.push('--sleep-subtitles', this.options.sleepSubtitles.toString());

    // Video Format Options
    if (this.options.format) this.args.push('-f', this.options.format);
    if (this.options.formatSort && this.options.formatSort.length > 0) {
      this.args.push('--format-sort', this.options.formatSort.join(','));
    }
    if (this.options.formatSortForce) this.args.push('--format-sort-force');
    if (this.options.noFormatSortForce) this.args.push('--no-format-sort-force');
    if (this.options.videoMultiStreams) this.args.push('--video-multistreams');
    if (this.options.noVideoMultiStreams) this.args.push('--no-video-multistreams');
    if (this.options.audioMultiStreams) this.args.push('--audio-multistreams');
    if (this.options.noAudioMultiStreams) this.args.push('--no-audio-multistreams');
    if (this.options.preferFreeFormats) this.args.push('--prefer-free-formats');
    if (this.options.noPreferFreeFormats) this.args.push('--no-prefer-free-formats');
    if (this.options.checkFormats) this.args.push('--check-formats');
    if (this.options.checkAllFormats) this.args.push('--check-all-formats');
    if (this.options.noCheckFormats) this.args.push('--no-check-formats');
    if (this.options.listFormats) this.args.push('--list-formats');
    if (this.options.mergeOutputFormat)
      this.args.push('--merge-output-format', this.options.mergeOutputFormat);

    // Subtitle Options
    if (this.options.writeSubs) this.args.push('--write-subs');
    if (this.options.noWriteSubs) this.args.push('--no-write-subs');
    if (this.options.writeAutoSubs) this.args.push('--write-auto-subs');
    if (this.options.writeAllSubs) this.args.push('--all-subs');
    if (this.options.listSubs) this.args.push('--list-subs');
    if (this.options.subFormat) this.args.push('--sub-format', this.options.subFormat);
    if (this.options.subLangs && this.options.subLangs.length > 0)
      this.args.push('--sub-langs', this.options.subLangs.join(','));

    // Authentication Options
    if (this.options.username) this.args.push('--username', this.options.username);
    if (this.options.password) this.args.push('--password', this.options.password);
    if (this.options.twoFactor) this.args.push('--twofactor', this.options.twoFactor);
    if (this.options.netrc) this.args.push('--netrc');
    if (this.options.videoPassword)
      this.args.push('--video-password', this.options.videoPassword);
    if (this.options.apMso) this.args.push('--ap-mso', this.options.apMso);
    if (this.options.apUsername) this.args.push('--ap-username', this.options.apUsername);
    if (this.options.apPassword) this.args.push('--ap-password', this.options.apPassword);
    if (this.options.netrcLocation)
      this.args.push('--netrc-location', this.options.netrcLocation);
    if (this.options.netrcCmd) this.args.push('--netrc-cmd', this.options.netrcCmd);
    if (this.options.apListMso) this.args.push('--ap-list-mso');
    if (this.options.clientCertificate)
      this.args.push('--client-certificate', this.options.clientCertificate);
    if (this.options.clientCertificateKey)
      this.args.push('--client-certificate-key', this.options.clientCertificateKey);
    if (this.options.clientCertificatePassword)
      this.args.push(
        '--client-certificate-password',
        this.options.clientCertificatePassword
      );

    // Post-Processing Options

    // Extractor Options

    if (this.options.extractorRetries !== undefined)
      this.args.push('--extractor-retries', this.options.extractorRetries.toString());
    if (this.options.allowDynamicMpd) this.args.push('--allow-dynamic-mpd');
    if (this.options.ignoreDynamicMpd) this.args.push('--ignore-dynamic-mpd');
    if (this.options.hlsSplitDiscontinuity) this.args.push('--hls-split-discontinuity');
    if (this.options.noHlsSplitDiscontinuity)
      this.args.push('--no-hls-split-discontinuity');
    // Extractor Options
    if (this.options.extractorArgs) {
      for (const [key, value] of Object.entries(this.options.extractorArgs)) {
        this.args.push('--extractor-args', `${key}:${value.join(' ')}`);
      }
    }

    if (this.options.playlistStart !== undefined)
      this.args.push('--playlist-start', this.options.playlistStart.toString());
    if (this.options.playlistEnd !== undefined)
      this.args.push('--playlist-end', this.options.playlistEnd.toString());

    if (this.options.matchTitle) this.args.push('--match-title', this.options.matchTitle);
    if (this.options.rejectTitle) this.args.push('--reject-title', this.options.rejectTitle);

    if (this.options.includeAds) this.args.push('--include-ads');

    if (this.options.breakOnReject) this.args.push('--break-on-reject');

    if (this.options.noDownload) this.args.push('--no-download');
    if (this.options.playlistReverse) this.args.push('--playlist-reverse');

    if (this.options.geoBypass) this.args.push('--geo-bypass');
    if (this.options.geoBypassCountry)
      this.args.push('--geo-bypass-country', this.options.geoBypassCountry);
    if (this.options.geoBypassIpBlock)
      this.args.push('--geo-bypass-ip-block', this.options.geoBypassIpBlock);

    // URL/File options

    // Thumbnail Options

    if (this.options.convertThumbnails)
      this.args.push('--convert-thumbnails', this.options.convertThumbnails);

    // Internet Shortcut Options
    if (this.options.writeLink) this.args.push('--write-link');
    if (this.options.writeUrlLink) this.args.push('--write-url-link');
    if (this.options.writeWeblocLink) this.args.push('--write-webloc-link');
    if (this.options.writeLnkLink) this.args.push('--write-lnk-link');

    // Workarounds

    if (this.options.userAgent) this.args.push('--user-agent', this.options.userAgent);

    // Authentication Options

    // Post-Processing Options
    if (this.options.extractAudio) this.args.push('--extract-audio');
    if (this.options.audioFormat) this.args.push('--audio-format', this.options.audioFormat);
    if (this.options.audioQuality) this.args.push('--audio-quality', this.options.audioQuality);
    if (this.options.remuxVideo) this.args.push('--remux-video', this.options.remuxVideo);
    if (this.options.recodeVideo) this.args.push('--recode-video', this.options.recodeVideo);
    if (this.options.postprocessorArgs) {
      for (const [key, value] of Object.entries(this.options.postprocessorArgs)) {
        this.args.push('--postprocessor-args', `${key}:${value.join(' ')}`);
      }
    }
    if (this.options.keepVideo) this.args.push('--keep-video');
    if (this.options.noKeepVideo) this.args.push('--no-keep-video');
    if (this.options.postOverwrites) this.args.push('--post-overwrites');
    if (this.options.noPostOverwrites) this.args.push('--no-post-overwrites');
    if (this.options.embedSubs) this.args.push('--embed-subs');
    if (this.options.noEmbedSubs) this.args.push('--no-embed-subs');
    if (this.options.embedThumbnail) this.args.push('--embed-thumbnail');
    if (this.options.noEmbedThumbnail) this.args.push('--no-embed-thumbnail');
    if (this.options.embedMetadata) this.args.push('--embed-metadata');
    if (this.options.noEmbedMetadata) this.args.push('--no-embed-metadata');
    if (this.options.embedChapters) this.args.push('--embed-chapters');
    if (this.options.noEmbedChapters) this.args.push('--no-embed-chapters');
    if (this.options.embedInfoJson) this.args.push('--embed-info-json');
    if (this.options.noEmbedInfoJson) this.args.push('--no-embed-info-json');

    if (this.options.parseMetadata) {
      for (const [key, value] of Object.entries(this.options.parseMetadata)) {
        this.args.push('--parse-metadata', `${key}:${value}`);
      }
    }

    if (this.options.replaceInMetadata) {
      for (const [key, [search, replace]] of Object.entries(
        this.options.replaceInMetadata
      )) {
        this.args.push('--replace-in-metadata', `${key} ${search} ${replace}`);
      }
    }

    if (this.options.xattrs) this.args.push('--xattrs');
    if (this.options.concatPlaylist)
      this.args.push('--concat-playlist', this.options.concatPlaylist);
    if (this.options.fixup) this.args.push('--fixup', this.options.fixup);
    if (this.options.ffmpegLocation)
      this.args.push('--ffmpeg-location', this.options.ffmpegLocation);
    if (this.options.exec) this.args.push('--exec', this.options.exec);
    if (this.options.noExec) this.args.push('--no-exec');
    if (this.options.convertSubs) this.args.push('--convert-subs', this.options.convertSubs);
    if (this.options.convertThumbnails)
      this.args.push('--convert-thumbnails', this.options.convertThumbnails);
    if (this.options.splitChapters) this.args.push('--split-chapters');
    if (this.options.noSplitChapters) this.args.push('--no-split-chapters');
    if (this.options.removeChapters)
      this.args.push('--remove-chapters', this.options.removeChapters);
    if (this.options.noRemoveChapters) this.args.push('--no-remove-chapters');
    if (this.options.forceKeyframesAtCuts) this.args.push('--force-keyframes-at-cuts');
    if (this.options.noForceKeyframesAtCuts) this.args.push('--no-force-keyframes-at-cuts');

    if (this.options.usePostProcessor && this.options.usePostProcessor.length > 0) {
      for (const pp of this.options.usePostProcessor) {
        this.args.push('--use-postprocessor', pp);
      }
    }

    // SponsorBlock Options
    if (this.options.sponsorblockMark && this.options.sponsorblockMark.length > 0) {
      this.args.push('--sponsorblock-mark', this.options.sponsorblockMark.join(','));
    }
    if (this.options.sponsorblockRemove && this.options.sponsorblockRemove.length > 0) {
      this.args.push('--sponsorblock-remove', this.options.sponsorblockRemove.join(','));
    }
    if (this.options.sponsorblockChapterTitle)
      this.args.push('--sponsorblock-chapter-title', this.options.sponsorblockChapterTitle);
    if (this.options.noSponsorblock) this.args.push('--no-sponsorblock');
    if (this.options.sponsorblockApi)
      this.args.push('--sponsorblock-api', this.options.sponsorblockApi);

    // Add any additional options
    if (this.options.additionalOptions && this.options.additionalOptions.length > 0) {
      this.args.push(...this.options.additionalOptions);
    }

    return [...this.args, this.url];
  }
}
