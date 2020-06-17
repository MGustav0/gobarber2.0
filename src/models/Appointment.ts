import { uuid } from 'uuidv4';

/** Entidade Appointment, usada para descrever os objetos Appointment.
 * É o molde do agendamento. */

class Appointment {
  id: string;

  provider: string;

  date: Date;

  constructor({ provider, date }: Omit<Appointment, 'id'>) {
    this.id = uuid();
    this.provider = provider;
    this.date = date;
  }
}

export default Appointment;
