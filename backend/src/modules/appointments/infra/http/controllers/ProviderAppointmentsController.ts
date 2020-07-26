import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListProviderAppointmentsService from '@modules/appointments/services/ListProviderAppointmentsService';
import { classToClass } from 'class-transformer';

export default class ProviderAppointmentsController {
  public async index(request: Request, response: Response): Promise<Response> {
    // Recupera a requisição após o login, pois vem de uma rota autenticada
    const provider_id = request.user.id;

    // Pega da requisição no browser
    const { day, month, year } = request.query;

    /** Carrega o service, verifica a necessidade de alguma dependência, em caso positivo,
     * vai no /shared/container e retorna uma instância da classe
     */
    const listProviderAppointments = container.resolve(
      ListProviderAppointmentsService,
    );

    const appointments = await listProviderAppointments.execute({
      provider_id,
      day: Number(day),
      month: Number(month),
      year: Number(year),
    });

    // Retorna ao browser o objeto criado
    return response.json(classToClass(appointments));
  }
}
