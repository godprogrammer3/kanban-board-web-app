import { Ticket, TicketStatus } from './models/ticket.class';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { MatDialog } from '@angular/material/dialog';
import { TicketPopupDialogData } from './dialogs/ticket-popup-dialog/ticket-popup-dialog.data';
import { TicketPopupDialogComponent } from './dialogs/ticket-popup-dialog/ticket-popup-dialog.component';
import { LoadingService } from './services/loading-service/loading.service';
import { TicketService } from './services/ticket-service/ticket-service.service';
import {
  SortBy,
  SortType,
} from './services/ticket-service/dto/get-all-ticket-request.dto';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'Kanban Board';
  pendingTickets: Ticket[] = [];
  acceptedTickets: Ticket[] = [];
  resolvedTickets: Ticket[] = [];
  rejectedTickets: Ticket[] = [];
  isLoading: boolean = false;
  pendingSortBy: SortBy = SortBy.createdAt;
  pendingSortType: SortType = SortType.asc;
  acceptedSortBy: SortBy = SortBy.createdAt;
  acceptedSortType: SortType = SortType.asc;
  resolvedSortBy: SortBy = SortBy.createdAt;
  resolvedSortType: SortType = SortType.asc;
  rejectedSortBy: SortBy = SortBy.createdAt;
  rejectedSortType: SortType = SortType.asc;
  constructor(
    public dialog: MatDialog,
    private loadingService: LoadingService,
    private ticketService: TicketService
  ) {}

  ngOnInit() {}

  ngAfterViewInit(): void {
    this.loadingService.loadingSubject.subscribe((isLoading) => {
      this.isLoading = isLoading;
    });
    this.loadTicket();
  }
  async drop(event: CdkDragDrop<Ticket[]>): Promise<void> {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      const ticket = event.previousContainer.data[event.previousIndex];
      if (event.container.id === 'pendingContainer') {
        ticket.status = TicketStatus.PENDING;
        const updatedTicket = await this.ticketService.update(
          ticket.id,
          ticket
        );
        if (updatedTicket) {
          event.previousContainer.data[event.previousIndex] = updatedTicket;
          transferArrayItem(
            event.previousContainer.data,
            event.container.data,
            event.previousIndex,
            event.currentIndex
          );
        }
      } else if (event.container.id === 'acceptedContainer') {
        ticket.status = TicketStatus.ACCEPTED;
        const updatedTicket = await this.ticketService.update(
          ticket.id,
          ticket
        );
        if (updatedTicket) {
          event.previousContainer.data[event.previousIndex] = updatedTicket;
          transferArrayItem(
            event.previousContainer.data,
            event.container.data,
            event.previousIndex,
            event.currentIndex
          );
        }
      } else if (event.container.id === 'resolvedContainer') {
        ticket.status = TicketStatus.RESOLVED;
        const updatedTicket = await this.ticketService.update(
          ticket.id,
          ticket
        );
        if (updatedTicket) {
          event.previousContainer.data[event.previousIndex] = updatedTicket;
          transferArrayItem(
            event.previousContainer.data,
            event.container.data,
            event.previousIndex,
            event.currentIndex
          );
        }
      } else if (event.container.id === 'rejectedContainer') {
        ticket.status = TicketStatus.REJECTED;
        const updatedTicket = await this.ticketService.update(
          ticket.id,
          ticket
        );
        if (updatedTicket) {
          event.previousContainer.data[event.previousIndex] = updatedTicket;
          transferArrayItem(
            event.previousContainer.data,
            event.container.data,
            event.previousIndex,
            event.currentIndex
          );
        }
      }
    }
  }

  onTicketClick({
    ticket,
    createStatus,
  }: {
    ticket?: Ticket;
    createStatus?: string;
  }) {
    if (createStatus) {
      ticket = { status: createStatus as TicketStatus } as Ticket;
    }
    const dialogRef = this.dialog.open(TicketPopupDialogComponent, {
      width: '40%',
      data: { ticket } as TicketPopupDialogData,
    });

    dialogRef.afterClosed().subscribe((ticket?: Ticket) => {
      if (ticket) {
        this.loadTicket();
      }
    });
  }

  loadTicket() {
    this.ticketService
      .getTickets({
        filterStatus: TicketStatus.PENDING,
        sortBy: SortBy.createdAt,
        sortType: SortType.asc,
      })
      .then((tickets) => {
        if (tickets) {
          this.pendingTickets = tickets;
        }
      });
    this.ticketService
      .getTickets({
        filterStatus: TicketStatus.ACCEPTED,
        sortBy: SortBy.createdAt,
        sortType: SortType.asc,
      })
      .then((tickets) => {
        if (tickets) {
          this.acceptedTickets = tickets;
        }
      });
    this.ticketService
      .getTickets({
        filterStatus: TicketStatus.RESOLVED,
        sortBy: SortBy.createdAt,
        sortType: SortType.asc,
      })
      .then((tickets) => {
        if (tickets) {
          this.resolvedTickets = tickets;
        }
      });
    this.ticketService
      .getTickets({
        filterStatus: TicketStatus.REJECTED,
        sortBy: SortBy.createdAt,
        sortType: SortType.asc,
      })
      .then((tickets) => {
        if (tickets) {
          this.rejectedTickets = tickets;
        }
      });
  }

  onSortMenuClick(status: string, sortBy: string, sortType: string) {
    switch (status) {
      case TicketStatus.PENDING:
        this.loadingService.isLoading = true;
        this.ticketService
          .getTickets({
            filterStatus: TicketStatus.PENDING,
            sortBy: sortBy as SortBy,
            sortType: sortType as SortType,
          })
          .then((tickets) => {
            this.loadingService.isLoading = false;
            if (tickets) {
              this.pendingTickets = tickets;
              this.pendingSortBy = sortBy as SortBy;
              this.pendingSortType = sortType as SortType;
            }
          });

        break;
      case TicketStatus.ACCEPTED:
        this.loadingService.isLoading = true;
        this.ticketService
          .getTickets({
            filterStatus: TicketStatus.ACCEPTED,
            sortBy: sortBy as SortBy,
            sortType: sortType as SortType,
          })
          .then((tickets) => {
            this.loadingService.isLoading = false;
            if (tickets) {
              this.acceptedTickets = tickets;
              this.acceptedSortBy = sortBy as SortBy;
              this.acceptedSortType = sortType as SortType;
            }
          });
        break;
      case TicketStatus.RESOLVED:
        this.loadingService.isLoading = true;
        this.ticketService
          .getTickets({
            filterStatus: TicketStatus.RESOLVED,
            sortBy: sortBy as SortBy,
            sortType: sortType as SortType,
          })
          .then((tickets) => {
            this.loadingService.isLoading = false;
            if (tickets) {
              this.resolvedTickets = tickets;
              this.resolvedSortBy = sortBy as SortBy;
              this.resolvedSortType = sortType as SortType;
            }
          });
        break;
      case TicketStatus.REJECTED:
        this.loadingService.isLoading = true;
        this.ticketService
          .getTickets({
            filterStatus: TicketStatus.REJECTED,
            sortBy: sortBy as SortBy,
            sortType: sortType as SortType,
          })
          .then((tickets) => {
            this.loadingService.isLoading = false;
            if (tickets) {
              this.rejectedTickets = tickets;
              this.rejectedSortBy = sortBy as SortBy;
              this.rejectedSortType = sortType as SortType;
            }
          });
        break;
    }
  }
}
