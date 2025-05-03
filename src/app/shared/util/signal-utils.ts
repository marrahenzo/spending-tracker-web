import { signal } from '@angular/core';

export function signalWithoutEquals(defaultValue: any) {
  return signal(defaultValue, { equal: (a, b) => false });
}
