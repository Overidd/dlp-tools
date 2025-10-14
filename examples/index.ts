import { createWriteStream } from 'node:fs'
import { Ytdlp } from '../src/api/YtDlp'

(async () => {

  const ytdlp = new Ytdlp({
    binary: {
      autoDownload: true,
      ffmpegPath: 'ffmpeg',
      ytDlpPath: 'yt-dlp',
    },
  })

  const info = await ytdlp.getInfo('https://www.youtube.com/watch?v=39o8nMOd3oY&list=RD39o8nMOd3oY&start_radio=1', {
    // noPlaylist
    flatPlaylist
  })

  console.log(info)

  //* ==================================================== 
  await ytdlp.download(
    'https://youtu.be/6bIimzl5NYM?si=l3AWo2Fh4vKwEGLp',
    {
      format: {
        filter: "audioandvideo",
        // quality: "720p",
        type: "mp4",
      },

      output: "./video/%(title)s.%(ext)s",

      onProgress: (progress) => {
        console.log(progress);
      },

      onError: (error) => {
        console.error(error)
      },

      onEnd: () => {
        console.log('Finalizado')
      },
    }
  );

  //* ==================================================== 
  const st = createWriteStream('video.mp4');
  const stream = ytdlp.stream('https://youtu.be/PO9GfBBjy7Y', {
    format: {
      filter: 'audioandvideo',

    },

    onProgress: (progress) => {
      console.log(progress)
    },
    onError: (error) => {
      console.error(error)
    },
    onEnd: () => {
      console.log('Finalizado')
    },
  });

  await stream.pipe(st);

  stream.stderr.on('data', (err) => {
    console.error(err)
  });

  stream.stdout.on('data', (data) => {
    console.log('Chunk recibido', data)
  });

  stream.on('close', () => {
    console.log('Download completed')
  });

  //* ==================================================== 
})()
// --ignore-errors --no-warnings
// '--live-from-start';

