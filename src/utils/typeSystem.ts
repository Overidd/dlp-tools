import os from 'node:os';

export const typeSystem = () => {
  const platform = os.platform();
  const arch = os.arch();

  return { platform, arch, os: `${platform}-${arch}` };
};