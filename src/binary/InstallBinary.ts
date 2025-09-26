import { spawn, spawnSync } from 'node:child_process';

export class InstallBinary {

  existSync = async (path: string) => {
    const binaryResult = spawnSync(path, ['--version'], {
      stdio: 'ignore'
    });

    return binaryResult.status === 0
  };

  async exist(path: string): Promise<boolean> {
    return new Promise((resolve) => {
      const binaryProcess = spawn(path, ['--version']);
      binaryProcess.on('close', (code) => {
        resolve(code === 0)
      })
    })
  }

  async install(): Promise<void> {
    throw new Error('Method not implemented.');
  }
}