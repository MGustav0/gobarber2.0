import Appointment from '@modules/appointments/infra/orm/entities/Appointment';

export default interface IAppointemsRepository {
  findByDate(date: Date): Promise<Appointment | undefined>;
}
