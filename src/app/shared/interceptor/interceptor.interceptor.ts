import {
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { catchError, of, throwError } from 'rxjs';

export const authInterceptorFn: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const toast = inject(ToastrService);

  // Make sure cookies and session ID are sent
  req = req.clone({
    withCredentials: true,
  });

  return next(req).pipe(
    catchError((error) => {
      // API should return 401 if there is no session
      if (error.status === 401) {
        toast.error('The session has expired. Please log in again.');
        router.navigate(['/login']);
        return of();
      }
      return throwError(() => error);
    })
  );
};
