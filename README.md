# DLP-Tools

[![npm version](https://badge.fury.io/js/dlp-tools.svg)](https://badge.fury.io/js/dlp-tools)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg)](https://www.typescriptlang.org/)

Un potente *wrapper* en TypeScript para **yt-dlp**, con gestión automática de binarios, API fluida y soporte para *streaming*.

## Características

* **Gestión Automática de Binarios** – Descarga y administra automáticamente los binarios de yt-dlp y ffmpeg.
* **Soporte TypeScript** – Soporte completo para TypeScript con definiciones de tipo detalladas.
* **Soporte de Streaming** – Transmite contenido multimedia directamente sin descargarlo al disco.
* **Seguimiento de Progreso** – Monitoreo en tiempo real del progreso de las descargas.
* **API Fluida** – API encadenable y fácil de usar para operaciones complejas.
* **Selección de Formato** – Selección inteligente de formatos con opciones de calidad.

## Instalación

```bash
npm install dlp-tools
```

## Inicio Rápido

```typescript
import { YtDlp } from 'dlp-tools';

const ytdlp = new YtDlp();

// Obtener información del video
const info = await ytdlp.getInfo('https://www.youtube.com/watch?v=dQw4w9WgXcQ');
console.log(info.title);

// Descargar video
await ytdlp.download('https://www.youtube.com/watch?v=dQw4w9WgXcQ', {
  quality: 'highest',
  onProgress: (progress) => {
    console.log(`Progreso: ${progress.percent}%`);
  }
});
```

## Referencia de la API

### Opciones del Constructor

```typescript
interface IOptions {
  outputDir?: string;
  binary?: {
    autoDownload?: boolean;
    ffmpegPath?: string;
    ytDlpPath?: string;
  };
}

const ytdlp = new YtDlp({
  outputDir: './downloads',
  binary: {
    autoDownload: true, // Valor por defecto: true
    ytDlpPath: '/custom/path/to/yt-dlp',
    ffmpegPath: '/custom/path/to/ffmpeg'
  }
});
```

### Métodos

#### `getInfo(url, options?)`

Obtiene información detallada sobre un video o lista de reproducción.

```typescript
const info = await ytdlp.getInfo('https://youtube.com/watch?v=VIDEO_ID', {
  dumpSingleJson: true // Por defecto
});

console.log({
  title: info.title,
  duration: info.duration,
  uploader: info.uploader,
  formats: info.formats
});
```

#### `download(url, options?)`

Descarga video/audio con seguimiento de progreso.

```typescript
await ytdlp.download(url, {
  quality: 'highest', // 'highest' | 'lowest' | 'best' | formato personalizado
  format: 'mp4',
  outputPath: './downloads',
  onProgress: (progress) => {
    console.log(`${progress.percent}% - ${progress.speed}`);
  },
  onError: (error) => {
    console.error('Error en la descarga:', error);
  },
  onEnd: () => {
    console.log('¡Descarga completada!');
  }
});
```

#### `stream(url, options?)`

Transmite contenido multimedia sin descargarlo al disco.

```typescript
import { createWriteStream } from 'fs';

const stream = ytdlp.stream(url, {
  quality: 'highest',
  format: 'mp4'
});

// Canalizar a un archivo
const fileStream = createWriteStream('output.mp4');
await stream.pipe(fileStream);

// O usar sincrónicamente
stream.pipeSync(process.stdout);
```

#### `exec(url, options?)`

Ejecuta comandos personalizados de yt-dlp con control total.

```typescript
const output = await ytdlp.exec(url, {
  extractFlat: true,
  playlistItems: '1-5',
  writeInfoJson: true
});
```

## Opciones de Formato

```typescript
interface FormatOptions<T> {
  quality?: 'highest' | 'lowest' | 'best' | string;
  format?: T; // 'mp4' | 'mp3' | 'webm' | etc.
  outputPath?: string;
  onProgress?: (progress: ProgressInfo) => void;
  onError?: (error: Error) => void;
  onEnd?: () => void;
}
```

## Información de Progreso

```typescript
interface ProgressInfo {
  percent: number;
  speed: string;
  size: string;
  eta: string;
  elapsed: string;
}
```

## Manejo de Errores

```typescript
try {
  await ytdlp.download(url, {
    onError: (error) => {
      console.error('Error en el stream:', error.message);
    }
  });
} catch (error) {
  console.error('La descarga falló:', error);
}
```

## Gestión de Binarios

El paquete administra automáticamente los binarios de yt-dlp y ffmpeg:

* Descarga los binarios en el primer uso si no se encuentran.
* Soporta rutas personalizadas para los binarios.
* Compatible con múltiples plataformas (Windows, macOS, Linux).
* Verificación automática de actualizaciones.

```typescript
// Usar rutas personalizadas para los binarios
const ytdlp = new YtDlp({
  binary: {
    autoDownload: false,
    ytDlpPath: '/usr/local/bin/yt-dlp',
    ffmpegPath: '/usr/local/bin/ffmpeg'
  }
});
```

## Requisitos

* Node.js 14 o superior
* TypeScript 4.5+ (para proyectos TypeScript)

## Contribuir

¡Las contribuciones son bienvenidas! No dudes en enviar un *Pull Request*.

## Licencia

Licencia MIT – consulta el archivo [LICENSE](LICENSE) para más detalles.

## Registro de Cambios

### 1.0.0

* Versión inicial
* *Wrapper* en TypeScript para yt-dlp
* Gestión automática de binarios
* Soporte de *streaming*
* Seguimiento de progreso

---

¿Quieres que te lo devuelva en formato `README.md` listo para usar (por ejemplo, con formato Markdown correcto y acentos escapados para npm)?
