import { isEqual } from 'date-fns';
import Appointment from '../models/Appointment';

interface CreateAppointment {
  provider: string;
  date: Date;
}

class AppointmentsRepository {
  private appointments: Appointment[];

  constructor() {
    this.appointments = [];
  }

  public all(): Appointment[] {
    return this.appointments;
  }

  /** Procura o agendamento, se achar, retorna o Appointment, se não, retorna nulo. */
  public findByDate(date: Date): Appointment | null {
    // Regra de negócio
    const findAppointment = this.appointments.find(appointment =>
      isEqual(date, appointment.date),
    );

    return findAppointment || null;
  }

  /** Recebe os dados do Service para criar o agendamento de acordo com o Model
   * Objeto da interface CreateAppointment */
  public create({ provider, date }: CreateAppointment): Appointment {
    // Criação de objeto appointment
    const appointment = new Appointment({ provider, date });

    // Salvar em this.appointments
    this.appointments.push(appointment);

    return appointment;
  }
}

export default AppointmentsRepository;
