import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { CoreModule } from '../core/core.module';
import { BookCardComponent } from './book-card/book-card.component';
import { SharedRoutingModule } from './sharedRoutingModule';


@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    BookCardComponent
  ],
  imports: [
    CommonModule,
    CoreModule,
    SharedRoutingModule
  ],
  exports:[HeaderComponent,FooterComponent, BookCardComponent]
})
export class SharedModule { }
