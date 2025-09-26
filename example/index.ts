import { YtDlp } from '../src/YtDlp';

(async () => {

  // Instancia de YtDlp y configuración
  const yt = new YtDlp({
    outputDir: '',

    binary: {
      autoDownload: true,
      ffmpegPath: '',
      ytDlpPath: '',
    },
  })


  // Retorna la información del video o playlist (cada video tiene una información diferente)
  const info = await yt.getInfo('https://www.youtube.com/watch?v=QH2TGUlweo8', {
    format: 'json', // 'json (default)' | 'text,
    // Mas configuraciones de retorno de la información de un (video o playlist)
  })


})()