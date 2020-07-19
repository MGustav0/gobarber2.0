import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

// import User from '@modules/users/infra/orm/entities/User';

import IUsersRepository from '@modules/users/repositories/IUsersRepositoriy';
import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';
import IUserTokensRepository from '@modules/users/repositories/IUserTokensRepository';

interface IRequest {
  email: string;
}

@injectable()
class SendForgotPasswordEmailService {
  // Contém os métodos de execução do repositório.
  constructor(
    @inject('usersRepository')
    private usersRepository: IUsersRepository,

    @inject('MailProvider')
    private mailProvider: IMailProvider,

    @inject('UserTokensRepository')
    private userTokensRepository: IUserTokensRepository,
  ) {}

  public async execute({ email }: IRequest): Promise<void> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('User does not exists.');
    }

    await this.userTokensRepository.generate(user.id);

    this.mailProvider.sendMail(email, 'body');
  }
}

export default SendForgotPasswordEmailService;
