import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { SessionStorageKeysService } from '../SessionStorageKeysService';
import { SessionStorageService } from '../SessionStorageService';

@Injectable()
export class LangInterceptor implements HttpInterceptor {

  constructor(
    private sessionStorageService: SessionStorageService,
    private sessionStorageKeys: SessionStorageKeysService,

  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // 🚨 Skip translation files & assets
    if (request.url.includes('/assets/')) {
      return next.handle(request);
    }
    const lang = this.sessionStorageService.getValue(this.sessionStorageKeys.userLanguage) || 'ar';

    const cloned = request.clone({
      setHeaders: {
        'Accept-Language': lang
      }
    });

    return next.handle(cloned);
   }
}
