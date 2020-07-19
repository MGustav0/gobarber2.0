import fs from 'fs';
import path from 'path';

import uploadConfig from '@config/upload';
import IStorageProvider from '../models/IMailProvider';

class DiskStorageProvider implements IStorageProvider {
  public async saveFile(file: string): Promise<string> {
    await fs.promises.rename(
      /** Salva o arquivo no diretório */
      path.resolve(uploadConfig.tmpFolder, file),
      /** Transfere o arquivo para a pasta uploads após a confirmação */
      path.resolve(uploadConfig.uploadsFolder, file),
    );

    return file;
  }

  public async deleteFile(file: string): Promise<void> {
    const filePath = path.resolve(uploadConfig.uploadsFolder, file);

    try {
      await fs.promises.stat(filePath);
    } catch {
      return;
    }

    await fs.promises.unlink(filePath);
  }
}

export default DiskStorageProvider;
