import { CreateTicketRequestDto } from './../../services/ticket-service/dto/create-ticket-request.dto';
import { Ticket, TicketStatus } from './../../models/ticket.class';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TicketPopupDialogData } from './ticket-popup-dialog.data';
import { TicketService } from 'src/app/services/ticket-service/ticket-service.service';
import { UpdateTicketRequestDto } from 'src/app/services/ticket-service/dto/update-ticket-request.dto';

@Component({
  selector: 'app-ticket-popup-dialog',
  templateUrl: './ticket-popup-dialog.component.html',
  styleUrls: ['./ticket-popup-dialog.component.scss'],
})
export class TicketPopupDialogComponent implements OnInit {
  form = new FormGroup({});
  chipClass = '';
  constructor(
    public dialogRef: MatDialogRef<TicketPopupDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: TicketPopupDialogData,
    private ticketService: TicketService
  ) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      title: new FormControl(this.data.ticket?.title, {
        validators: [Validators.required],
      }),
      description: new FormControl(this.data.ticket?.description, {
        validators: [Validators.required],
      }),
      contact: new FormControl(this.data.ticket?.contact, {
        validators: [Validators.required],
      }),
    });
    switch (this.data.ticket?.status) {
      case TicketStatus.ACCEPTED:
        this.chipClass = 'accepted-chip';
        break;
      case TicketStatus.RESOLVED:
        this.chipClass = 'resolved-chip';
        break;
      case TicketStatus.REJECTED:
        this.chipClass = 'rejected-chip';
        break;
      default:
        this.chipClass = '';
    }
  }

  onClose(): void {
    this.dialogRef.close(null);
  }

  onCreate(): void {
    if (this.form.valid) {
      const ticket: CreateTicketRequestDto = {
        title: this.form.value.title,
        contact: this.form.value.contact,
        description: this.form.value.description,
        status: this.data.ticket?.status!,
      };

      this.ticketService.create(ticket).then((ticket) => {
        if (ticket) {
          this.dialogRef.close(ticket);
        }
      });
    } else {
      this.form.markAllAsTouched();
    }
  }

  onUpdate(): void {
    if (this.form.valid) {
      const ticket: UpdateTicketRequestDto = {
        title: this.form.value.title,
        contact: this.form.value.contact,
        description: this.form.value.description,
        status: this.data.ticket?.status!,
      };

      this.ticketService
        .update(this.data.ticket?.id!, ticket)
        .then((ticket) => {
          if (ticket) {
            this.dialogRef.close(ticket);
          }
        });
    } else {
      this.form.markAllAsTouched();
    }
  }
}
