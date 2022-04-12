import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketPopupDialogComponent } from './ticket-popup-dialog.component';

describe('TicketPopupDialogComponent', () => {
  let component: TicketPopupDialogComponent;
  let fixture: ComponentFixture<TicketPopupDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TicketPopupDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketPopupDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
