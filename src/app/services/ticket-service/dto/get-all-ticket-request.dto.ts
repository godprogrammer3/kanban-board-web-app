import { TicketStatus } from 'src/app/models/ticket.class';

export enum SortBy {
  status = 'status',
  createdAt = 'createdAt',
  updatedAt = 'updatedAt',
}

export enum SortType {
  asc = 'asc',
  desc = 'desc',
}

export class GetAllTicketRequestDto {
  filterStatus?: TicketStatus;
  sortBy?: SortBy;
  sortType?: SortType;
}
