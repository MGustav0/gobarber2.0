import { getRepository, Repository } from 'typeorm';

import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';

import Appointment from '@modules/appointments/infra/orm/entities/Appointment';

class AppointmentsRepository implements IAppointmentsRepository {
  /** A variável ormRepository é uma repositório do TypeORM da entidade Appointment.
   * Cria a tipagem do repositório.
   */
  private ormRepository: Repository<Appointment>;

  /** Cria o repositório */
  constructor() {
    this.ormRepository = getRepository(Appointment);
  }

  /** Regra de negócio.
   * Procura o agendamento, se achar, retorna o Appointment, se não, retorna nulo. */
  public async findByDate(date: Date): Promise<Appointment | undefined> {
    const findAppointment = await this.ormRepository.findOne({
      where: { date },
    });

    return findAppointment;
  }

  /** Retorna os dados, por uma promise, no final cria um Appointment  */
  public async create({
    provider_id,
    date,
  }: ICreateAppointmentDTO): Promise<Appointment> {
    const appointment = this.ormRepository.create({ provider_id, date });

    /** Salva no banco */
    await this.ormRepository.save(appointment);

    return appointment;
  }
}

export default AppointmentsRepository;
