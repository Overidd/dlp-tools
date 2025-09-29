import { Ytdlp } from '../src/api/YtDlp'

(async () => {

  // Instancia de YtDlp y configuración
  const ytdlp = new Ytdlp({
    binary: {
      autoDownload: true,
      ffmpegPath: 'ffmpeg',
      ytDlpPath: 'yt-dlp',
    },
  })

  const info = await ytdlp.getInfo('https://youtu.be/uAYeYLYupiI?si=ETE-OYbgbItT-ky5', {
    mode: 'perVideo',
  })


})()