import User from '@modules/users/infra/orm/entities/User';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import IFindAllProvidersDTO from '@modules/appointments/dtos/IFindAllProvidersDTO';

/** Define um contrato da aplicação, quando esses métodos forem utilizados:
 * 1. Receberão uma ou mais variáveis (data)
 * 2. Realiza o CRUD no banco
 * 3. Retornarão via Promise um User ou undefined, por exemplo.
 */
export default interface IUsersRepository {
  findAllProviders(data: IFindAllProvidersDTO): Promise<User[]>;
  findById(id: string): Promise<User | undefined>;
  findByEmail(email: string): Promise<User | undefined>;
  create(data: ICreateUserDTO): Promise<User>;
  save(user: User): Promise<User>;
}
