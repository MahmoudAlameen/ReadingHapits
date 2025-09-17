import { Component } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { Book } from './classes/Book';
import { TranslateService } from '@ngx-translate/core';
import { OnInit } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'ReadingHapits';
  book:number=1
  width:string="200px"
  height:string="200px"
  constructor(private translate: TranslateService)
  {


    // Auto-detect browser language (optional)
    const browserLang = translate.getBrowserLang();
    //translate.use(browserLang?.match(/en|ar/) ? browserLang : 'ar');

  }

  ngOnInit(): void {

    
  }
  
}
