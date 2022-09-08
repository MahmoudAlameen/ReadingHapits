import { Component } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { Book } from './classes/Book';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor()
  {

  }
  title = 'ReadingHapits';
  book:number=1
  width:string="200px"
  height:string="200px"


  
}
