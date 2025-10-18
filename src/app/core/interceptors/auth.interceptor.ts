import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private router: Router
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      // Catch any errors that occur during the request processing
      catchError((error: HttpErrorResponse) => {
        
        // Check if the error is 401 Unauthorized
        if (error.status === 401) {
          this.router.navigate(['home/login']);
        }

        // Always re-throw the error so that the component making the API call 
        // can still handle the error if necessary.
        return throwError(() => error);
      })
    ); }
}
