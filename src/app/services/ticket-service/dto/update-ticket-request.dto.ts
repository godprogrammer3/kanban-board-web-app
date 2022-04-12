import { TicketStatus } from 'src/app/models/ticket.class';

export class UpdateTicketRequestDto {
  title?: string;

  description?: string;

  status?: TicketStatus;

  contact?: string;
}
