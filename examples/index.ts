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

  // TODO: falta obtener el porcentaje de la obtención de la información
  const info = await ytdlp.getInfo('https://www.youtube.com/watch?v=qgbsuCCGQkE&list=RD39o8nMOd3oY&index=2', {
  })

  console.log(info)
})()
