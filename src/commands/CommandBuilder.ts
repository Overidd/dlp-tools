import { IArgsOptions } from '../interface';

export class CommandBuilder {
  private url: string = '';
  private args: string[] = [];

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

  setOptions(options: IArgsOptions): this {
    if (options.printHelp) this.args.push('--help');
    if (options.printVersion) this.args.push('--version');
    if (options.update) this.args.push('--update');
    if (options.noUpdate) this.args.push('--no-update');
    if (options.updateTo) this.args.push('--update-to', options.updateTo);
    if (options.ignoreErrors) this.args.push('--ignore-errors');
    if (options.noAbortOnError) this.args.push('--no-abort-on-error');
    if (options.abortOnError) this.args.push('--abort-on-error');
    if (options.dumpUserAgent) this.args.push('--dump-user-agent');
    if (options.listExtractors) this.args.push('--list-extractors');
    if (options.extractorDescriptions) this.args.push('--extractor-descriptions');

    if (options.useExtractors && options.useExtractors.length > 0) {
      this.args.push('--use-extractors', options.useExtractors.join(','));
    }
    if (options.defaultSearch)
      this.args.push('--default-search', options.defaultSearch);

    if (options.ignoreConfig) this.args.push('--ignore-config');
    if (options.noConfigLocations) this.args.push('--no-config-location');

    if (options.configLocations && options.configLocations.length > 0)
      this.args.push('--config-locations', ...options.configLocations);

    if (options.pluginDirs && options.pluginDirs.length > 0) {
      for (const dir of options.pluginDirs) {
        this.args.push('--plugin-dirs', dir);
      }
    }
    if (options.noPluginDirs) this.args.push('--no-plugin-dirs');
    if (options.flatPlaylist) this.args.push('--flat-playlist');

    if (options.noFlatPlaylist) this.args.push('--no-flat-playlist');

    if (options.liveFromStart) this.args.push('--live-from-start');
    if (options.noLiveFromStart) this.args.push('--no-live-from-start');

    if (options.waitForVideo)
      this.args.push('--wait-for-video', options.waitForVideo.toString());
    if (options.noWaitForVideo) this.args.push('--no-wait-for-video');
    if (options.markWatched) this.args.push('--mark-watched');
    if (options.noMarkWatched) this.args.push('--no-mark-watched');
    if (options.color) this.args.push('--color', options.color);

    if (options.compatOptions && options.compatOptions.length > 0) {
      this.args.push('--compat-options', options.compatOptions.join(','));
    }

    if (options.aliases && options.aliases.length > 0) {
      this.args.push('--alias', ...options.aliases);
    }

    // Network Options
    if (options.proxy) this.args.push('--proxy', options.proxy);
    if (options.socketTimeout)
      this.args.push('--socket-timeout', options.socketTimeout.toString());
    if (options.sourceAddress)
      this.args.push('--source-address', options.sourceAddress);

    if (options.impersonate && options.impersonate.length > 0)
      this.args.push('--impersonate', options.impersonate.join(','));

    if (options.listImpersonateTargets) this.args.push('--list-impersonate-targets');

    if (options.forceIpv4) this.args.push('--force-ipv4');
    if (options.forceIpv6) this.args.push('--force-ipv6');

    if (options.enableFileUrls) this.args.push('--enable-file-urls');

    // Geo-restriction
    if (options.geoVerificationProxy)
      this.args.push('--geo-verification-proxy', options.geoVerificationProxy);
    if (options.xff) this.args.push('--xff', options.xff);

    // Video Selection
    if (options.playlistItems)
      this.args.push('--playlist-items', options.playlistItems);
    if (options.minFilesize) this.args.push('--min-filesize', options.minFilesize);
    if (options.maxFilesize) this.args.push('--max-filesize', options.maxFilesize);
    if (options.date) this.args.push('--date', options.date);
    if (options.dateBefore) this.args.push('--datebefore', options.dateBefore);
    if (options.dateAfter) this.args.push('--dateafter', options.dateAfter);
    if (options.matchFilter) this.args.push('--match-filter', options.matchFilter);
    if (options.noMatchFilters) this.args.push('--no-match-filters');
    if (options.breakMatchFilters)
      this.args.push('--break-match-filters', options.breakMatchFilters);
    if (options.noBreakMatchFilters) this.args.push('--no-break-match-filters');
    if (options.noPlaylist) this.args.push('--no-playlist');
    if (options.yesPlaylist) this.args.push('--yes-playlist');
    if (options.ageLimit) this.args.push('--age-limit', options.ageLimit.toString());
    if (options.downloadArchive)
      this.args.push('--download-archive', options.downloadArchive);
    if (options.noDownloadArchive) this.args.push('--no-download-archive');
    if (options.maxDownloads)
      this.args.push('--max-downloads', options.maxDownloads.toString());
    if (options.breakOnExisting) this.args.push('--break-on-existing');
    if (options.noBreakOnExisting) this.args.push('--no-break-on-existing');
    if (options.breakPerInput) this.args.push('--break-per-input');
    if (options.noBreakPerInput) this.args.push('--break-per-input');
    if (options.skipPlaylistAfterErrors)
      this.args.push(
        '--skip-playlist-after-errors',
        options.skipPlaylistAfterErrors.toString()
      );

    // Download Options
    if (options.concurrentFragments)
      this.args.push('--concurrent-fragments', options.concurrentFragments.toString());
    if (options.limitRate) this.args.push('--limit-rate', options.limitRate);
    if (options.throttledRate)
      this.args.push('--throttled-rate', options.throttledRate);
    if (options.retries) this.args.push('--retries', options.retries.toString());
    if (options.fileAccessRetries)
      this.args.push('--file-access-retries', options.fileAccessRetries.toString());

    if (options.fragmentRetries)
      this.args.push('--fragment-retries', options.fragmentRetries.toString());

    if (options.retrySleep)
      this.args.push('--retry-sleep', options.retrySleep.toString());
    if (options.skipUnavailableFragments)
      this.args.push('--skip-unavailable-fragments');
    if (options.abortOnUnavailableFragment)
      this.args.push('--abort-on-unavailable-fragment');

    if (options.keepFragments) this.args.push('--keep-fragments');
    if (options.noKeepFragments) this.args.push('--no-keep-fragments');
    if (options.bufferSize) this.args.push('--buffer-size', options.bufferSize);
    if (options.resizeBuffer) this.args.push('--resize-buffer');
    if (options.noResizeBuffer) this.args.push('--no-resize-buffer');
    if (options.httpChunkSize)
      this.args.push('--http-chunk-size', options.httpChunkSize);
    if (options.playlistRandom) this.args.push('--playlist-random');
    if (options.lazyPlaylist) this.args.push('--lazy-playlist');
    if (options.noLazyPlaylist) this.args.push('--no-lazy-playlist');
    if (options.xattrSetFilesize) this.args.push('--xattr-set-filesize');
    if (options.hlsUseMpegts) this.args.push('--hls-use-mpegts');
    if (options.noHlsUseMpegts) this.args.push('--no-hls-use-mpegts');
    if (options.downloadSections)
      this.args.push('--download-sections', options.downloadSections.toString());
    if (options.downloader) this.args.push('--downloader', options.downloader);
    if (options.downloaderArgs)
      this.args.push('--downloader-args', options.downloaderArgs);

    // Filesystem Options
    if (options.batchFile) this.args.push('--batch-file', options.batchFile);
    if (options.noBatchFile) this.args.push('--no-batch-file');
    if (options.paths) {
      if (typeof options.paths === 'string') {
        this.args.push('--paths', options.paths);
      } else {
        for (const [key, value] of Object.entries(options.paths)) {
          this.args.push('--paths', `${key}:${value}`);
        }
      }
    }
    if (options.output) this.args.push('-o', options.output);
    if (options.outputNaPlaceholder)
      this.args.push('--output-na-placeholder', options.outputNaPlaceholder);
    if (options.restrictFilenames) this.args.push('--restrict-filenames');
    if (options.noRestrictFilenames) this.args.push('--no-restrict-filenames');
    if (options.windowsFilenames) this.args.push('--windows-filenames');
    if (options.noWindowsFilenames) this.args.push('--no-windows-filenames');
    if (options.trimFileNames)
      this.args.push('--trim-file-names', options.trimFileNames.toString());
    if (options.noOverwrites) this.args.push('--no-overwrites');
    if (options.forceOverwrites) this.args.push('--force-overwrites');
    if (options.noForceOverwrites) this.args.push('--no-force-overwrites');
    if (options.continue) this.args.push('--continue');
    if (options.noContinue) this.args.push('--no-continue');
    if (options.part) this.args.push('--part');
    if (options.noPart) this.args.push('--no-part');
    if (options.mtime) this.args.push('--mtime');
    if (options.noMtime) this.args.push('--no-mtime');
    if (options.writeDescription) this.args.push('--write-description');
    if (options.noWriteDescription) this.args.push('--no-write-description');
    if (options.writeInfoJson) this.args.push('--write-info-json');
    if (options.noWriteInfoJson) this.args.push('--no-write-info-json');
    if (options.writePlaylistMetafiles) this.args.push('--write-playlist-metafiles');
    if (options.noWritePlaylistMetafiles)
      this.args.push('--no-write-playlist-metafiles');
    if (options.cleanInfoJson) this.args.push('--clean-info-json');
    if (options.noCleanInfoJson) this.args.push('--no-clean-info-json');
    if (options.writeComments) this.args.push('--write-comments');
    if (options.noWriteComments) this.args.push('--no-write-comments');
    if (options.loadInfoJson)
      this.args.push('--load-info-json', options.loadInfoJson.toString());
    if (options.cookies) this.args.push('--cookies', options.cookies);
    if (options.noCookies) this.args.push('--no-cookies');
    if (options.cookiesFromBrowser)
      this.args.push('--cookies-from-browser', options.cookiesFromBrowser);
    if (options.noCookiesFromBrowser) this.args.push('--no-cookies-from-browser');
    if (options.cacheDir) this.args.push('--cache-dir', options.cacheDir);
    if (options.noCacheDir) this.args.push('--no-cache-dir');
    if (options.rmCacheDir) this.args.push('--rm-cache-dir');

    // Thumbnail Options
    if (options.writeThumbnail) this.args.push('--write-thumbnail');
    if (options.noWriteThumbnails) this.args.push('--no-write-thumbnails');
    if (options.writeAllThumbnails) this.args.push('--write-all-thumbnails');
    if (options.listThumbnails) this.args.push('--list-thumbnails');

    // Internet Shortcut Options
    if (options.writeLink) this.args.push('--write-link');
    if (options.writeUrlLink) this.args.push('--write-url-link');
    if (options.writeWeblocLink) this.args.push('--write-webloc-link');
    if (options.writeDesktopLink) this.args.push('--write-desktop-link');

    // Verbosity and Simulation Options
    if (options.quiet) this.args.push('--quiet');
    if (options.noQuiet) this.args.push('--no-quiet');
    if (options.noWarnings) this.args.push('--no-warnings');
    if (options.simulate) this.args.push('--simulate');
    if (options.noSimulate) this.args.push('--no-simulate');
    if (options.ignoreNoFormatsError) this.args.push('--ignore-no-formats-error');
    if (options.noIgnoreNoFormatsError) this.args.push('--no-ignore-no-formats-error');
    if (options.skipDownload) this.args.push('--skip-download');
    if (options.print) this.args.push('--print', options.print);
    if (options.printToFile) this.args.push('--print-to-file', options.printToFile);
    if (options.dumpJson) this.args.push('--dump-json');
    if (options.dumpSingleJson) this.args.push('--dump-single-json');
    if (options.forceWriteArchive) this.args.push('--force-write-archive');
    if (options.newline) this.args.push('--newline');
    if (options.noProgress) this.args.push('--no-progress');
    if (options.progress) this.args.push('--progress');
    if (options.consoleTitle) this.args.push('--console-title');
    if (options.progressTemplate)
      this.args.push('--progress-template', options.progressTemplate);
    if (options.progressDelta)
      this.args.push('--progress-delta', options.progressDelta.toString());
    if (options.verbose) this.args.push('--verbose');
    if (options.dumpPages) this.args.push('--dump-pages');
    if (options.writePages) this.args.push('--write-pages');
    if (options.printTraffic) this.args.push('--print-traffic');

    // Workarounds
    if (options.encoding) this.args.push('--encoding', options.encoding);
    if (options.legacyServerConnect) this.args.push('--legacy-server-connect');
    if (options.noCheckCertificates) this.args.push('--no-check-certificates');
    if (options.preferInsecure) this.args.push('--prefer-insecure');
    if (options.addHeaders) {
      for (const [key, value] of Object.entries(options.addHeaders)) {
        this.args.push('--add-headers', `${key}:${value}`);
      }
    }
    if (options.bidiWorkaround) this.args.push('--bidi-workaround');
    if (options.sleepRequests)
      this.args.push('--sleep-requests', options.sleepRequests.toString());
    if (options.sleepInterval)
      this.args.push('--sleep-interval', options.sleepInterval.toString());
    if (options.maxSleepInterval)
      this.args.push('--max-sleep-interval', options.maxSleepInterval.toString());
    if (options.sleepSubtitles)
      this.args.push('--sleep-subtitles', options.sleepSubtitles.toString());

    // Video Format Options
    if (options.format) this.args.push('-f', options.format);
    if (options.formatSort && options.formatSort.length > 0) {
      this.args.push('--format-sort', options.formatSort.join(','));
    }
    if (options.formatSortForce) this.args.push('--format-sort-force');
    if (options.noFormatSortForce) this.args.push('--no-format-sort-force');
    if (options.videoMultiStreams) this.args.push('--video-multistreams');
    if (options.noVideoMultiStreams) this.args.push('--no-video-multistreams');
    if (options.audioMultiStreams) this.args.push('--audio-multistreams');
    if (options.noAudioMultiStreams) this.args.push('--no-audio-multistreams');
    if (options.preferFreeFormats) this.args.push('--prefer-free-formats');
    if (options.noPreferFreeFormats) this.args.push('--no-prefer-free-formats');
    if (options.checkFormats) this.args.push('--check-formats');
    if (options.checkAllFormats) this.args.push('--check-all-formats');
    if (options.noCheckFormats) this.args.push('--no-check-formats');
    if (options.listFormats) this.args.push('--list-formats');
    if (options.mergeOutputFormat)
      this.args.push('--merge-output-format', options.mergeOutputFormat);

    // Subtitle Options
    if (options.writeSubs) this.args.push('--write-subs');
    if (options.noWriteSubs) this.args.push('--no-write-subs');
    if (options.writeAutoSubs) this.args.push('--write-auto-subs');
    if (options.writeAllSubs) this.args.push('--all-subs');
    if (options.listSubs) this.args.push('--list-subs');
    if (options.subFormat) this.args.push('--sub-format', options.subFormat);
    if (options.subLangs && options.subLangs.length > 0)
      this.args.push('--sub-langs', options.subLangs.join(','));

    // Authentication Options
    if (options.username) this.args.push('--username', options.username);
    if (options.password) this.args.push('--password', options.password);
    if (options.twoFactor) this.args.push('--twofactor', options.twoFactor);
    if (options.netrc) this.args.push('--netrc');
    if (options.videoPassword)
      this.args.push('--video-password', options.videoPassword);
    if (options.apMso) this.args.push('--ap-mso', options.apMso);
    if (options.apUsername) this.args.push('--ap-username', options.apUsername);
    if (options.apPassword) this.args.push('--ap-password', options.apPassword);
    if (options.netrcLocation)
      this.args.push('--netrc-location', options.netrcLocation);
    if (options.netrcCmd) this.args.push('--netrc-cmd', options.netrcCmd);
    if (options.apListMso) this.args.push('--ap-list-mso');
    if (options.clientCertificate)
      this.args.push('--client-certificate', options.clientCertificate);
    if (options.clientCertificateKey)
      this.args.push('--client-certificate-key', options.clientCertificateKey);
    if (options.clientCertificatePassword)
      this.args.push(
        '--client-certificate-password',
        options.clientCertificatePassword
      );

    // Post-Processing Options

    // Extractor Options

    if (options.extractorRetries !== undefined)
      this.args.push('--extractor-retries', options.extractorRetries.toString());
    if (options.allowDynamicMpd) this.args.push('--allow-dynamic-mpd');
    if (options.ignoreDynamicMpd) this.args.push('--ignore-dynamic-mpd');
    if (options.hlsSplitDiscontinuity) this.args.push('--hls-split-discontinuity');
    if (options.noHlsSplitDiscontinuity)
      this.args.push('--no-hls-split-discontinuity');
    // Extractor Options
    if (options.extractorArgs) {
      for (const [key, value] of Object.entries(options.extractorArgs)) {
        this.args.push('--extractor-args', `${key}:${value.join(' ')}`);
      }
    }

    if (options.playlistStart !== undefined)
      this.args.push('--playlist-start', options.playlistStart.toString());
    if (options.playlistEnd !== undefined)
      this.args.push('--playlist-end', options.playlistEnd.toString());

    if (options.matchTitle) this.args.push('--match-title', options.matchTitle);
    if (options.rejectTitle) this.args.push('--reject-title', options.rejectTitle);

    if (options.includeAds) this.args.push('--include-ads');

    if (options.breakOnReject) this.args.push('--break-on-reject');

    if (options.noDownload) this.args.push('--no-download');
    if (options.playlistReverse) this.args.push('--playlist-reverse');

    if (options.geoBypass) this.args.push('--geo-bypass');
    if (options.geoBypassCountry)
      this.args.push('--geo-bypass-country', options.geoBypassCountry);
    if (options.geoBypassIpBlock)
      this.args.push('--geo-bypass-ip-block', options.geoBypassIpBlock);

    // URL/File options

    // Thumbnail Options

    if (options.convertThumbnails)
      this.args.push('--convert-thumbnails', options.convertThumbnails);

    // Internet Shortcut Options
    if (options.writeLink) this.args.push('--write-link');
    if (options.writeUrlLink) this.args.push('--write-url-link');
    if (options.writeWeblocLink) this.args.push('--write-webloc-link');
    if (options.writeLnkLink) this.args.push('--write-lnk-link');

    // Workarounds

    if (options.userAgent) this.args.push('--user-agent', options.userAgent);

    // Authentication Options

    // Post-Processing Options
    if (options.extractAudio) this.args.push('--extract-audio');
    if (options.audioFormat) this.args.push('--audio-format', options.audioFormat);
    if (options.audioQuality) this.args.push('--audio-quality', options.audioQuality);
    if (options.remuxVideo) this.args.push('--remux-video', options.remuxVideo);
    if (options.recodeVideo) this.args.push('--recode-video', options.recodeVideo);
    if (options.postprocessorArgs) {
      for (const [key, value] of Object.entries(options.postprocessorArgs)) {
        this.args.push('--postprocessor-args', `${key}:${value.join(' ')}`);
      }
    }
    if (options.keepVideo) this.args.push('--keep-video');
    if (options.noKeepVideo) this.args.push('--no-keep-video');
    if (options.postOverwrites) this.args.push('--post-overwrites');
    if (options.noPostOverwrites) this.args.push('--no-post-overwrites');
    if (options.embedSubs) this.args.push('--embed-subs');
    if (options.noEmbedSubs) this.args.push('--no-embed-subs');
    if (options.embedThumbnail) this.args.push('--embed-thumbnail');
    if (options.noEmbedThumbnail) this.args.push('--no-embed-thumbnail');
    if (options.embedMetadata) this.args.push('--embed-metadata');
    if (options.noEmbedMetadata) this.args.push('--no-embed-metadata');
    if (options.embedChapters) this.args.push('--embed-chapters');
    if (options.noEmbedChapters) this.args.push('--no-embed-chapters');
    if (options.embedInfoJson) this.args.push('--embed-info-json');
    if (options.noEmbedInfoJson) this.args.push('--no-embed-info-json');

    if (options.parseMetadata) {
      for (const [key, value] of Object.entries(options.parseMetadata)) {
        this.args.push('--parse-metadata', `${key}:${value}`);
      }
    }

    if (options.replaceInMetadata) {
      for (const [key, [search, replace]] of Object.entries(
        options.replaceInMetadata
      )) {
        this.args.push('--replace-in-metadata', `${key} ${search} ${replace}`);
      }
    }

    if (options.xattrs) this.args.push('--xattrs');
    if (options.concatPlaylist)
      this.args.push('--concat-playlist', options.concatPlaylist);
    if (options.fixup) this.args.push('--fixup', options.fixup);
    if (options.ffmpegLocation)
      this.args.push('--ffmpeg-location', options.ffmpegLocation);
    if (options.exec) this.args.push('--exec', options.exec);
    if (options.noExec) this.args.push('--no-exec');
    if (options.convertSubs) this.args.push('--convert-subs', options.convertSubs);
    if (options.convertThumbnails)
      this.args.push('--convert-thumbnails', options.convertThumbnails);
    if (options.splitChapters) this.args.push('--split-chapters');
    if (options.noSplitChapters) this.args.push('--no-split-chapters');
    if (options.removeChapters)
      this.args.push('--remove-chapters', options.removeChapters);
    if (options.noRemoveChapters) this.args.push('--no-remove-chapters');
    if (options.forceKeyframesAtCuts) this.args.push('--force-keyframes-at-cuts');
    if (options.noForceKeyframesAtCuts) this.args.push('--no-force-keyframes-at-cuts');

    if (options.usePostProcessor && options.usePostProcessor.length > 0) {
      for (const pp of options.usePostProcessor) {
        this.args.push('--use-postprocessor', pp);
      }
    }

    // SponsorBlock Options
    if (options.sponsorblockMark && options.sponsorblockMark.length > 0) {
      this.args.push('--sponsorblock-mark', options.sponsorblockMark.join(','));
    }
    if (options.sponsorblockRemove && options.sponsorblockRemove.length > 0) {
      this.args.push('--sponsorblock-remove', options.sponsorblockRemove.join(','));
    }
    if (options.sponsorblockChapterTitle)
      this.args.push('--sponsorblock-chapter-title', options.sponsorblockChapterTitle);
    if (options.noSponsorblock) this.args.push('--no-sponsorblock');
    if (options.sponsorblockApi)
      this.args.push('--sponsorblock-api', options.sponsorblockApi);

    // Add any additional options
    if (options.additionalOptions && options.additionalOptions.length > 0) {
      this.args.push(...options.additionalOptions);
    }

    return this;
  }

  build(): string[] {
    if (!this.url) throw new Error('URL is required');
    return [...this.args, this.url];
  }
}
