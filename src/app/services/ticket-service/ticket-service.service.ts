import { CreateTicketRequestDto } from './dto/create-ticket-request.dto';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, firstValueFrom } from 'rxjs';
import { Ticket, TicketStatus } from 'src/app/models/ticket.class';
import { environment } from 'src/environments/environment';
import { LoadingService } from '../loading-service/loading.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GetAllTicketRequestDto } from './dto/get-all-ticket-request.dto';
import * as dayjs from 'dayjs';
import { UpdateTicketRequestDto } from './dto/update-ticket-request.dto';

@Injectable({
  providedIn: 'root',
})
export class TicketService {
  constructor(
    private http: HttpClient,
    private loadingService: LoadingService,
    private _snackBar: MatSnackBar
  ) {}

  async create(ticket: CreateTicketRequestDto): Promise<Ticket | null> {
    this.loadingService.isLoading = true;
    try {
      const response = await firstValueFrom(
        this.http.post<Ticket>(
          environment.apiBaseUrl + environment.ticketApiPath.create,
          ticket
        )
      );
      this.loadingService.isLoading = false;
      response.createdAt = dayjs(response.createdAt);
      response.updatedAt = dayjs(response.updatedAt);
      return response;
    } catch (error) {
      this.loadingService.isLoading = false;
      this._snackBar.open((error as HttpErrorResponse).statusText, 'Close', {
        duration: 2000,
      });
      return null;
    }
  }

  async update(
    id: string,
    ticket: UpdateTicketRequestDto
  ): Promise<Ticket | null> {
    this.loadingService.isLoading = true;
    try {
      const response = await firstValueFrom(
        this.http.patch<Ticket>(
          environment.apiBaseUrl + environment.ticketApiPath.create + '/' + id,
          ticket
        )
      );
      this.loadingService.isLoading = false;
      response.createdAt = dayjs(response.createdAt);
      response.updatedAt = dayjs(response.updatedAt);
      return response;
    } catch (error) {
      this.loadingService.isLoading = false;
      this._snackBar.open((error as HttpErrorResponse).statusText, 'Close', {
        duration: 2000,
      });
      return null;
    }
  }

  async getTickets(
    getAllTicketRequestDto: GetAllTicketRequestDto
  ): Promise<Ticket[] | null> {
    try {
      const tickets = await firstValueFrom(
        this.http.get<Ticket[]>(
          environment.apiBaseUrl + environment.ticketApiPath.getAll,
          {
            params: { ...getAllTicketRequestDto },
          }
        )
      );
      return tickets.map((ticket) => ({
        ...ticket,
        createdAt: dayjs(ticket.createdAt),
        updatedAt: dayjs(ticket.updatedAt),
      }));
    } catch (error) {
      this._snackBar.open((error as HttpErrorResponse).statusText, 'Close', {
        duration: 2000,
      });
      return null;
    }
  }
}
