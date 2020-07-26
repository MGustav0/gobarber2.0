import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListProviderDayAvailabilityService from '@modules/appointments/services/ListProviderDayAvailabilityService';

export default class ProviderDayAvailabilityController {
  public async index(request: Request, response: Response): Promise<Response> {
    // Pega as informações do usuário logado
    const { provider_id } = request.params;
    const { day, month, year } = request.query;

    const listDayProviderAvailability = container.resolve(
      ListProviderDayAvailabilityService,
    );

    const availability = await listDayProviderAvailability.execute({
      provider_id,
      day: Number(day),
      month: Number(month),
      year: Number(year),
    });

    // Retorna ao browser o objeto criado
    return response.json(availability);
  }
}
