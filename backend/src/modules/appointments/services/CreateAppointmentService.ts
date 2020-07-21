import { startOfHour } from 'date-fns';
import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import Appointment from '@modules/appointments/infra/orm/entities/Appointment';

import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import IUsersRepository from '@modules/users/repositories/IUsersRepositoriy';

interface IRequest {
  provider_id: string;
  date: Date;
}

@injectable()
class CreateAppointmentService {
  // Contém os métodos de execução do repositório.
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  // Recebe o date e o provider da rota
  public async execute({ provider_id, date }: IRequest): Promise<Appointment> {
    // Regra de negócio
    const appointmentDate = startOfHour(date);

    const user = await this.usersRepository.findById(provider_id);

    if (!user) {
      throw new AppError('User not found.');
    }

    // Consulta no repositório se há o objeto
    const findAppointmentInSameDate = await this.appointmentsRepository.findByDate(
      appointmentDate,
    );

    if (findAppointmentInSameDate) {
      throw new AppError('This appointment is already booked.');
    }

    // Cria o agendamento através do repositório, a instância do objeto
    const appointment = await this.appointmentsRepository.create({
      provider_id,
      date: appointmentDate,
    });

    return appointment;
  }
}

export default CreateAppointmentService;
