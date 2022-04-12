import { Ticket } from './../models/ticket.class';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.scss'],
})
export class TicketComponent implements OnInit {
  @Input() ticket!: Ticket;
  @Input() color!: string;
  @Input() onClickTitle!: (params: {
    ticket?: Ticket;
    createStatus?: string;
  }) => void;
  ngOnInit(): void {}
}
