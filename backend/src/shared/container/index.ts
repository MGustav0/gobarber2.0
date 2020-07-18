import { container } from 'tsyringe';

import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import AppointmentsRepository from '@modules/appointments/infra/orm/repositories/AppointmentsRepository';

import IUsersRepository from '@modules/users/repositories/IUsersRepositoriy';
import UsersRepository from '@modules/users/infra/orm/repositories/UsersRepository';

/** registerSingleton instancia a classe uma única vez durante todo o ciclo de vida
 * da aplicação.
 */
container.registerSingleton<IAppointmentsRepository>(
  'AppointmentsRepository',
  AppointmentsRepository,
);

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);
