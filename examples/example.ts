import { createWriteStream } from 'node:fs'
import { Ytdlp } from '../src/api/YtDlp'

(async () => {

  const ytdlp = new Ytdlp({
    binary: {
      autoDownload: true,
    },
  })

  // const info = await ytdlp.getInfo('https://www.youtube.com/watch?v=39o8nMOd3oY&list=RD39o8nMOd3oY&start_radio=1', {
  //   // noPlaylist
  //   // flatPlaylist
  // })

  // console.log(info)

  // //* ==================================================== 
  await ytdlp.download(
    'https://youtu.be/VAuMrxuGlQw?si=kQe0S27ha4KQXmmz',
    {
      format: {
        filter: 'mergevideo',
        quality: {
          video: '720p',
          audio: 'medium',
        },

        type: 'mp4',
      },

      // output: './video/%(title)s.%(ext)s',

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
  // const st = createWriteStream('video.mp4');
  // const stream = ytdlp.stream('https://youtu.be/VAuMrxuGlQw?si=kQe0S27ha4KQXmmz', {
  //   format: {
  //     filter: 'mergevideo',
  //     quality: {
  //       video: '720p',
  //     },

  //     type: 'mp4',

  //   },

  //   onProgress: (progress) => {
  //     console.log(progress, '----')
  //   },
  //   onError: (error) => {
  //     console.error(error)
  //   },
  //   onEnd: () => {
  //     console.log('Finalizado')
  //   },
  // });

  // await stream.pipe(st);
  //* ==================================================== 
})()
// --ignore-errors --no-warnings
// '--live-from-start';

