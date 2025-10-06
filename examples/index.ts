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
  const info = await ytdlp.getInfo('https://www.youtube.com/watch?v=39o8nMOd3oY&list=RD39o8nMOd3oY&start_radio=1', {
    // flatPlaylist: true
    dumpSingleJson: true
  })

  console.log(info)

})()