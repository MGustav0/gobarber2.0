import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListProviderMonthAvailabilityService from '@modules/appointments/services/ListProviderMonthAvailabilityService';

export default class ProviderMonthAvailabilityController {
  public async index(request: Request, response: Response): Promise<Response> {
    // Pega as informações do usuário logado
    const { provider_id } = request.params;
    const { month, year } = request.body;

    const listMonthProviderAvailability = container.resolve(
      ListProviderMonthAvailabilityService,
    );

    const availability = await listMonthProviderAvailability.execute({
      provider_id,
      month,
      year,
    });

    // Retorna ao browser o objeto criado
    return response.json(availability);
  }
}
