import { uuid } from 'uuidv4';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import IFindAllProvidersDTO from '@modules/appointments/dtos/IFindAllProvidersDTO';

import User from '@modules/users/infra/orm/entities/User';

class FakeUsersRepository implements IUsersRepository {
  private users: User[] = [];

  public async findById(id: string): Promise<User | undefined> {
    const findUser = this.users.find(user => user.id === id);
    return findUser;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const findUserByEmail = this.users.find(user => user.email === email);

    return findUserByEmail;
  }

  public async findAllProviders({
    except_user_id,
  }: IFindAllProvidersDTO): Promise<User[]> {
    let { users } = this;

    /** Filtra os usuários, excetuando o usuário atual */
    if (except_user_id) {
      users = this.users.filter(user => user.id !== except_user_id);
    }

    return users;
  }

  /** Retorna os dados, por uma promise, no final cria um User  */
  public async create({
    name,
    email,
    password,
  }: ICreateUserDTO): Promise<User> {
    const user = new User();

    Object.assign(user, { id: uuid(), name, email, password });

    this.users.push(user);

    return user;
  }

  public async save(user: User): Promise<User> {
    /** Verifica se o usuário existe */
    const findIndex = this.users.findIndex(findUser => findUser.id === user.id);

    /** Sobrescreve o usuário */
    this.users[findIndex] = user;

    return user;
  }
}

export default FakeUsersRepository;
