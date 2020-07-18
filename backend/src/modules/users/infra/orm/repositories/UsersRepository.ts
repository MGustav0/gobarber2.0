import { getRepository, Repository } from 'typeorm';

import IUsersRepository from '@modules/users/repositories/IUsersRepositoriy';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import User from '@modules/users/infra/orm/entities/User';

class UsersRepository implements IUsersRepository {
  /** A variável ormRepository é uma repositório do TypeORM da entidade User.
   * Cria a tipagem do repositório.
   */
  private ormRepository: Repository<User>;

  /** Cria o repositório */
  constructor() {
    this.ormRepository = getRepository(User);
  }

  public async findById(id: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne(id);

    return user;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({
      where: { email },
    });

    return user;
  }

  /** Retorna os dados, por uma promise, no final cria um User  */
  public async create({
    name,
    email,
    password,
  }: ICreateUserDTO): Promise<User> {
    const user = this.ormRepository.create({ name, email, password });

    /** Salva no banco */
    await this.ormRepository.save(user);

    return user;
  }

  public async save(user: User): Promise<User> {
    return this.ormRepository.save(user);
  }
}

export default UsersRepository;
