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

        // ✅ Case 1: Business validation inside 200 response
        if (body?.isValid === false) {
          const message =
            body.errorMessage || 'حدث خطأ أثناء تنفيذ العملية';
          this.customAlert.showError(message);
        }
      }
    }),

    catchError((error: HttpErrorResponse) => {

      // 🔐 401 Unauthorized
      if (error.status === 401) {
        this.router.navigate(['authentication']);
        return throwError(() => error);
      }

      // 🚫 404 Not Found
      if (error.status === 404) {
        this.customAlert.showError(
          'Not Found: The requested resource does not exist.'
        );
        return throwError(() => error);
      }

      // ⚠️ 400 Bad Request
      if (error.status === 400) {

        // ✅ Case 2: Your custom business validation response
        if (error.error?.isValid === false) {
          const message =
            error.error.errorMessage || 'Validation failed';
          this.customAlert.showError(message);
          return throwError(() => error);
        }

        // ✅ Case 3: ASP.NET ProblemDetails (ModelState)
        if (error.error?.errors) {
          const validationErrors = error.error.errors;

          const messages: string[] = [];

          Object.keys(validationErrors).forEach(field => {
            validationErrors[field].forEach((msg: string) => {
              messages.push(msg);
            });
          });

          this.customAlert.showError(messages.join('\n'));
          return throwError(() => error);
        }

        // ✅ Fallback for 400
        this.customAlert.showError(
          error.error?.title ||
          error.error?.message ||
          'Bad request'
        );

        return throwError(() => error);
      }

      // 🔥 500 Internal Server Error
      if (error.status === 500) {
        this.customAlert.showError(
          error.error?.title ||
          error.error?.message ||
          'Internal Server Error, please try again later.'
        );
        return throwError(() => error);
      }

      // ⚠️ Other backend errors (like 403, 502, etc.)
      if (error.error?.title) {
        this.customAlert.showError(error.error.title);
        return throwError(() => error);
      }

      // 🧨 Final fallback
      this.customAlert.showError(
        error.message || 'Unexpected error occurred'
      );

      return throwError(() => error);
    })
  );
}
}