import { getMongoRepository, MongoRepository } from 'typeorm';

import INotificationsRepository from '@modules/notifications/repositories/INotificationsRepository';

import ICreateNotificationDTO from '@modules/notifications/dtos/ICreateNotificationDTO';

import Notification from '@modules/notifications/infra/orm/schemas/Notification';

class NotificationsRepository implements INotificationsRepository {
  /** A variável ormRepository é uma repositório do TypeORM da entidade Notifications.
   * Cria a tipagem do repositório.
   */
  private ormRepository: MongoRepository<Notification>;

  /** Cria o repositório */
  constructor() {
    this.ormRepository = getMongoRepository(Notification, 'mongo');
  }

  /** Retorna os dados, por uma promise, no final cria uma Notification  */
  public async create({
    content,
    recipient_id,
  }: ICreateNotificationDTO): Promise<Notification> {
    const notification = this.ormRepository.create({
      content,
      recipient_id,
    });

    /** Salva no banco */
    await this.ormRepository.save(notification);

    return notification;
  }
}

export default NotificationsRepository;
