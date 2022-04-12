import { Dayjs } from 'dayjs';

export enum TicketStatus {
  PENDING = 'Pending',
  ACCEPTED = 'Accepted',
  RESOLVED = 'Resolved',
  REJECTED = 'Rejected',
}
export class Ticket {
  id!: string;
  title!: string;
  description!: string;
  status!: TicketStatus;
  contact!: string;
  createdAt!: Dayjs;
  updatedAt!: Dayjs;
}
