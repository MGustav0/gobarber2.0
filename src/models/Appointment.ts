import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

/** Entidade Appointment, usada para descrever os objetos Appointment.
 * É o molde do agendamento. */
@Entity('appointments')
class Appointment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  provider: string;

  @Column('time with time zone')
  date: Date;
}

export default Appointment;
