import { uuid } from 'uuidv4';

import IUsersTokensRepository from '@modules/users/repositories/IUserTokensRepository';

import UserToken from '@modules/users/infra/orm/entities/UserToken';

class FakeUserTokensRepository implements IUsersTokensRepository {
  /** Cria o repositório de testes */
  private userTokens: UserToken[] = [];

  public async generate(user_id: string): Promise<UserToken> {
    const userToken = new UserToken();

    Object.assign(userToken, {
      id: uuid(),
      token: uuid(),
      user_id,
    });

    this.userTokens.push(userToken);

    return userToken;
  }

  public async findByToken(token: string): Promise<UserToken | undefined> {
    const userToken = this.userTokens.find(
      findToken => findToken.token === token,
    );

    return userToken;
  }
}

export default FakeUserTokensRepository;
