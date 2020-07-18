import path from 'path';
import fs from 'fs';

import upoloadConfig from '@config/upload';
import AppError from '@shared/errors/AppError';
import User from '@modules/users/infra/orm/entities/User';
import IAppointmentsRepository from '@modules/users/repositories/IUsersRepositoriy';

interface IRequest {
  user_id: string;
  avatarFilename: string;
}

class UpdateUserAvatarService {
  constructor(private usersRepository: IAppointmentsRepository) {}

  public async execute({ user_id, avatarFilename }: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(user_id);

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

    await this.usersRepository.save(user);

    return user;
  }
}

export default UpdateUserAvatarService;
