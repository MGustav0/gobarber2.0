import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import User from '@modules/users/infra/orm/entities/User';

/** Entidade Appointment, usada para descrever os objetos Appointment.
 * É o molde do agendamento. */
@Entity('appointments')
class Appointment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  provider_id: string;

  /** Estabelece o relacionamento entre o Model User e Appointment
   * A arrow function retorna o model a ser usado
   * @JoinColumn identifica o usuário/objeto deste prestador/agendamento
   */
  @ManyToOne(() => User)
  @JoinColumn({ name: 'provider_id' })
  provider: User;

  @Column('time with time zone')
  date: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Appointment;
