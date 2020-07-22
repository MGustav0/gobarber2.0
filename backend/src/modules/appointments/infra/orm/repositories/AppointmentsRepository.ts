import { getRepository, Repository, Raw } from 'typeorm';

import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';

import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';
import IFindAllInMonthFromProviderDTO from '@modules/appointments/dtos/IFindAllInMonthFromProviderDTO';
import IFindAllInDayFromProviderDTO from '@modules/appointments/dtos/IFindAllInDayFromProviderDTO';

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

  public async findAllInMonthFromProvider({
    provider_id,
    month,
    year,
  }: IFindAllInMonthFromProviderDTO): Promise<Appointment[]> {
    /** A função Raw, do TypeORM permite executar funções SQL dentro do banco de dados
     * A função 'to_char' é usada no PostgreSQL, e o dateFieldName é para usar
     * o nome específico que o TypeORM dá à coluna.
     * O padStart define que se o mês vier sem o 0 à esquerda, ele o colocará, pois
     * o JavaScript não coloca por padrão.
     */
    const parsedMonth = String(month).padStart(2, '0');

    const appointments = this.ormRepository.find({
      where: {
        provider_id,
        date: Raw(
          dateFieldName =>
            `to_char(${dateFieldName}, 'MM-YYYY') = '${parsedMonth}-${year}'`,
        ),
      },
    });

    return appointments;
  }

  public async findAllInDayFromProvider({
    provider_id,
    day,
    month,
    year,
  }: IFindAllInDayFromProviderDTO): Promise<Appointment[]> {
    const parsedDay = String(day).padStart(2, '0');
    const parsedMonth = String(month).padStart(2, '0');

    const appointments = this.ormRepository.find({
      where: {
        provider_id,
        date: Raw(
          dateFieldName =>
            `to_char(${dateFieldName}, 'DD-MM-YYYY') = '${parsedDay}-${parsedMonth}-${year}'`,
        ),
      },
    });

    return appointments;
  }

  /** Retorna os dados, por uma promise, no final cria um Appointment  */
  public async create({
    provider_id,
    user_id,
    date,
  }: ICreateAppointmentDTO): Promise<Appointment> {
    const appointment = this.ormRepository.create({
      provider_id,
      user_id,
      date,
    });

    /** Salva no banco */
    await this.ormRepository.save(appointment);

    return appointment;
  }
}

export default AppointmentsRepository;
