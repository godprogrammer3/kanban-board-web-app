import { TicketStatus } from 'src/app/models/ticket.class';

export class CreateTicketRequestDto {
  title!: string;

  description!: string;

  status!: TicketStatus;

  contact!: string;
}
