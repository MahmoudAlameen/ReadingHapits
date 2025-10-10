import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeModule } from './home/home.module';
import { ReadingRoomModule } from './reading-room/reading-room.module';
import { SharedModule } from './shared/shared.module';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { DirDirective } from './customDirectives/dir.directive';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './core/interceptors/token.interceptor';
import { JwtModule, JWT_OPTIONS } from '@auth0/angular-jwt';

// Function to tell the JwtModule where to find the token
export function tokenGetter() {
  // Use sessionStorage based on the security recommendation
  return sessionStorage.getItem('jwt_token');
}
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
@NgModule({
  declarations: [
    AppComponent,
    DirDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,HomeModule,
    SharedModule,
    ReadingRoomModule,
        HttpClientModule,
    TranslateModule.forRoot({
      defaultLanguage: 'en',
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter
        // The list of backend URLs the JWT should be added to (optional, but good for security)
       // allowedDomains: ['your-api-domain.com'], 
      }
    })
  ],
  
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
