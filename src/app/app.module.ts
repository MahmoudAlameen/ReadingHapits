import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeModule } from './home/home.module';
import { ReadingRoomModule } from './reading-room/reading-room.module';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,HomeModule,
    SharedModule,
    ReadingRoomModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
