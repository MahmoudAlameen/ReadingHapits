import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SessionStorageKeysService } from '../SessionStorageKeysService';
import { SessionStorageService } from '../SessionStorageService';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(
    private sessionStorageService: SessionStorageService,
    private sessionStorageKeys: SessionStorageKeysService
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const token = this.sessionStorageService.getValue(this.sessionStorageKeys.jwt_token);
    // Clone the request and add the Authorization header
    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}` // Standard JWT format
        }
      });
    }
    return next.handle(request);
  }
}