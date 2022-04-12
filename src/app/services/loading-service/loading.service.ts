import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  loadingSubject = new BehaviorSubject<boolean>(false);
  constructor() {}

  set isLoading(value: boolean) {
    this.loadingSubject.next(value);
  }
}
