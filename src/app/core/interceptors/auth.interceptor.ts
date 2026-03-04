import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HttpResponse
} from '@angular/common/http';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { BYPASS_INTERCEPTOR } from './no-interceptor.context';
import { CustomAlertService } from '../custom-alert.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private router: Router,
    private customAlert : CustomAlertService

  ) {}

intercept(
  request: HttpRequest<unknown>,
  next: HttpHandler
): Observable<HttpEvent<unknown>> {
  return next.handle(request).pipe(

    tap((event: HttpEvent<any>) => {

      if (event instanceof HttpResponse) {

        const body = event.body as any;

        // Handle generic backend validation failure
        if (body?.isValid === false) {

          const message =
            body.errorMessage || 'حدث خطأ أثناء تنفيذ العملية';
          this.customAlert.showError(message);
        }
      }
    }),

    // Keep catchError ONLY for real HTTP errors
// Handle HTTP errors (400, 401, 403, 500...)
    catchError((error: HttpErrorResponse) => {
      // 🔐 Unauthorized
      if (error.status === 401) {
        this.router.navigate(['authentication']);
        return throwError(() => error);
      }
      if (error.status === 404) {
        this.customAlert.showError('Not Found: The requested resource does not exist.');
        return throwError(() => error);
      }

      //  Validation errors (ProblemDetails)
      if (error.status === 400 && error.error?.errors) {
        const validationErrors = error.error.errors;

        // Flatten all messages
        const messages: string[] = [];

        Object.keys(validationErrors).forEach(field => {
          validationErrors[field].forEach((msg: string) => {
            messages.push(msg);
          });
        });
        this.customAlert.showError(messages.join('\n'));
        //alert(messages);
        return throwError(() => error);
      }

      // 🔥 Other backend errors
      if (error.error?.title)
        this.customAlert.showError(error.error.title);

      return throwError(() => error);
    })
  );
}
}
