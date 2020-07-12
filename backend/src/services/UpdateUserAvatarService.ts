import { getRepository } from 'typeorm';
import path from 'path';
import fs from 'fs';

import upoloadConfig from '../config/upload';
import User from '../models/User';
import AppError from '../errors/AppError';

interface Request {
  user_id: string;
  avatarFilename: string;
}

class UpdateUserAvatarService {
  public async execute({ user_id, avatarFilename }: Request): Promise<User> {
    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne(user_id);

    if (!user) {
      throw new AppError('Only authenticated users can change avatar.', 401);
    }

    /** Deletar avatar anterior, deleta o arquivo em disco e substitui o id no BD */
    if (user.avatar) {
      const userAvatarFilePath = path.join(
        upoloadConfig.directory,
        user.avatar,
      );

      // fs.promises - Usa as funções do File Sistem (fs) do node em formato de promises.
      const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);

      if (userAvatarFileExists) {
        await fs.promises.unlink(userAvatarFilePath);
      }
    }

    /** Atualiza as informações do usuário, no caso o avatar */
    user.avatar = avatarFilename;

    await usersRepository.save(user);

    return user;
  }
}

export default UpdateUserAvatarService;