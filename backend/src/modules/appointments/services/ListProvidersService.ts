import { injectable, inject } from 'tsyringe';
import { classToClass } from 'class-transformer';

import User from '@modules/users/infra/orm/entities/User';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

interface IRequest {
  user_id: string;
}

@injectable()
class ListProvidersService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  /** Envia uma lista de usuários em forma array da plataforma, excetuando o
   * usuário atual.
   */
  public async execute({ user_id }: IRequest): Promise<User[]> {
    /** Tenta encontrar o cache de usuários */
    let users = await this.cacheProvider.recover<User[]>(
      `providers-list:${user_id}`,
    );

    /** Se não encontrar, faz a busca e salva em cache */
    if (!users) {
      users = await this.usersRepository.findAllProviders({
        except_user_id: user_id,
      });

      await this.cacheProvider.save(
        `providers-list:${user_id}`,
        classToClass(users),
      );
    }

    return users;
  }
}

export default ListProvidersService;
