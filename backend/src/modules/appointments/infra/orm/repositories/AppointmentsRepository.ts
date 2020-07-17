import { EntityRepository, Repository } from 'typeorm';

import IAppointmentsRepository from '@modules/appointments/infra/repositories/IAppointmentsRepository';
import Appointment from '@modules/appointments/infra/orm/entities/Appointment';

@EntityRepository(Appointment)
class AppointmentsRepository extends Repository<Appointment>
  implements IAppointmentsRepository {
  /** Regra de negócio.
   * Procura o agendamento, se achar, retorna o Appointment, se não, retorna nulo. */
  public async findByDate(date: Date): Promise<Appointment | undefined> {
    const findAppointment = await this.findOne({
      where: { date },
    });

    return findAppointment;
  }
}

export default AppointmentsRepository;
