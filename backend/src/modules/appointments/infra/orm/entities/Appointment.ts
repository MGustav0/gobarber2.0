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

  @Column() // Coluna real do banco de dados
  provider_id: string;

  /** Estabelece o relacionamento entre o Model User e Appointment, é um relacionamento
   * criado para o JavaScript identificar, não para o banco
   * A arrow function retorna o model a ser usado
   * @JoinColumn identifica o usuário/objeto deste prestador/agendamento
   */
  @ManyToOne(() => User)
  @JoinColumn({ name: 'provider_id' })
  provider: User;

  @Column()
  user_id: string;

  /** () => User, { eager: true } - Traz informações da tabela (users).
   * { lazy: true } - Permite a busca de uma informação na respectiva tabela (usuário)
   *  através de requisições pelo código
   */
  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column('time with time zone')
  date: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Appointment;
