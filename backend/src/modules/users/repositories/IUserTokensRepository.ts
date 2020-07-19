import UserToken from '@modules/users/infra/orm/entities/UserToken';

export default interface IUserTokensRepository {
  generate(user_id: string): Promise<UserToken>;
}
