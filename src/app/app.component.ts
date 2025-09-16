import { Component, Inject, LOCALE_ID } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { Book } from './classes/Book';
import { DOCUMENT } from '@angular/common';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
constructor(
  @Inject(DOCUMENT) private document: Document,
  @Inject(LOCALE_ID) public locale: string
) {
 // this.document.documentElement.lang = locale;
  this.document.documentElement.dir = locale === 'ar' ? 'rtl' : 'ltr';
}
  title = 'ReadingHapits';
  book:number=1
  width:string="200px"
  height:string="200px"


  
}
