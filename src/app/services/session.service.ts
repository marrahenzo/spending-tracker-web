import { Injectable } from '@angular/core';
import { signalWithoutEquals } from '../shared/util/signal-utils';

@Injectable({
  providedIn: 'root',
})
export class SessionService {
  operationsUpdateSignal = signalWithoutEquals(true);

  constructor() {}

  getOperationsUpdateSignal() {
    return this.operationsUpdateSignal;
  }

  setOperationsUpdateSignal(value = true) {
    return this.operationsUpdateSignal.set(value);
  }
}
