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
      const resul: (number | null)[] = []
      for (let i = 1; i <= 2; i++) {
        const binaryProcess = spawn(path, [`${'-'.repeat(i)}version`]);

        binaryProcess.stdout.on('data', (data) => {
          resul.push(data);
        });

        binaryProcess.on('close', (code) => {
          if (resul.length < 2) return;
          resolve(resul.some((code) => code === 0));
        })
      }
    })
  }

  async install(): Promise<void> {
    throw new Error('Method not implemented.');
  }
}