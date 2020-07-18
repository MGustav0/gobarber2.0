import { hash } from 'bcryptjs';

import AppError from '@shared/errors/AppError';
import User from '@modules/users/infra/orm/entities/User';
import IAppointmentsRepository from '@modules/users/repositories/IUsersRepositoriy';

interface IRequest {
  name: string;
  email: string;
  password: string;
}

class CreateUserService {
  // Contém os métodos de execução do repositório.
  constructor(private usersRepository: IAppointmentsRepository) {}

  public async execute({ name, email, password }: IRequest): Promise<User> {
    const checkUserExists = await this.usersRepository.findByEmail(email);

    if (checkUserExists) {
      throw new AppError('Email address already used.');
    }

    const hashedPassword = await hash(password, 8);

    const user = await this.usersRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    return user;
  }
}

export default CreateUserService;
