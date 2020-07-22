import { injectable, inject } from 'tsyringe';
import { getDaysInMonth, getDate } from 'date-fns';

import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';

interface IRequest {
  provider_id: string;
  month: number;
  year: number;
}

type IResponse = Array<{
  day: number;
  available: boolean;
}>;

@injectable()
class ListProviderMonthAvailabilityService {
  constructor(
    @inject('IAppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,
  ) {}

  /** Envia uma lista de usuários da plataforma, por isso o [] no  */
  public async execute({
    provider_id,
    month,
    year,
  }: IRequest): Promise<IResponse> {
    const appointmentsInMonth = await this.appointmentsRepository.findAllInMonthFromProvider(
      {
        provider_id,
        year,
        month,
      },
    );

    /** Pega a quantidade de dias em um mês em número */
    const numberOfDaysInMonth = getDaysInMonth(new Date(year, month - 1));

    /** Monta um array do tamanho do número de 'numberOfDaysInMonth' começando no
     * índice 1
     */
    const eachDayArray = Array.from(
      { length: numberOfDaysInMonth },
      (_, index) => index + 1,
    );

    /** Verifica se há agendamento neste dia em específico */
    const availability = eachDayArray.map(day => {
      const appointmentsInDay = appointmentsInMonth.filter(appointment => {
        return getDate(appointment.date) === day;
      });

      return {
        day,
        available: appointmentsInDay.length < 10,
      };
    });

    return availability;
  }
}

export default ListProviderMonthAvailabilityService;
