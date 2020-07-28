import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';

export default class AppointmentsController {
  public async create(request: Request, response: Response): Promise<Response> {
    // Recupera a requisição após o login, pois vem de uma rota autenticada
    const user_id = request.user.id;
    // Pega da requisição no browser
    const { provider_id, date } = request.body;

    /** Carrega o service, verifica a necessidade de alguma dependência, em caso positivo,
     * vai no /shared/container e retorna uma instância da classe
     */
    const createAppointment = container.resolve(CreateAppointmentService);

    const appointment = await createAppointment.execute({
      provider_id,
      user_id,
      date,
    });

    // Retorna ao browser o objeto criado
    return response.json(appointment);
  }
}
