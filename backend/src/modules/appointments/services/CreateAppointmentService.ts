import { startOfHour } from 'date-fns';
import { getCustomRepository } from 'typeorm';

import Appointment from '../entities/Appointment';
import AppointmentsRepository from '../repositories/AppointmentsRepository';
import AppError from '../../../shared/errors/AppError';

interface Request {
  provider_id: string;
  date: Date;
}

class CreateAppointmentService {
  // Recebe o date e o provider da rota
  public async execute({ provider_id, date }: Request): Promise<Appointment> {
    // Contém os métodos de execução do repositório.
    const appointmentsRepository = getCustomRepository(AppointmentsRepository);

    // Regra de negócio
    const appointmentDate = startOfHour(date);

    // Consulta no repositório se há o objeto
    const findAppointmentInSameDate = await appointmentsRepository.findByDate(
      appointmentDate,
    );

    if (findAppointmentInSameDate) {
      throw new AppError('This appointment is already booked.');
    }

    // Cria o agendamento através do repositório, a instância do objeto
    const appointment = appointmentsRepository.create({
      provider_id,
      date: appointmentDate,
    });

    // Salva a instância de appointment criada acima no repositório.
    await appointmentsRepository.save(appointment);

    return appointment;
  }
}

export default CreateAppointmentService;
