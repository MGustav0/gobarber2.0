import { ObjectID } from 'mongodb';

import INotificationsRepository from '@modules/notifications/repositories/INotificationsRepository';

import ICreateNotificationDTO from '@modules/notifications/dtos/ICreateNotificationDTO';

import Notification from '@modules/notifications/infra/orm/schemas/Notification';

class FakeNotificationsRepository implements INotificationsRepository {
  /** Cria a variável que armazenará as informações, o "Banco de Dados" */
  private notifications: Notification[] = [];

  /** Retorna os dados, por uma promise, no final cria uma Notification  */
  public async create({
    content,
    recipient_id,
  }: ICreateNotificationDTO): Promise<Notification> {
    const notification = new Notification();

    Object.assign(notification, { id: new ObjectID(), content, recipient_id });

    /** Salva na variável */
    this.notifications.push(notification);

    return notification;
  }
}

export default FakeNotificationsRepository;
