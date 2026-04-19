import { Component } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { Book } from './classes/Book';
import { TranslateService } from '@ngx-translate/core';
import { OnInit } from '@angular/core';
import { SessionStorageKeysService } from './core/SessionStorageKeysService';
import { SessionStorageService } from './core/SessionStorageService';


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
  constructor(
    private translate: TranslateService,
  private SessionStorageService: SessionStorageService,
  private sessionStorageKeys: SessionStorageKeysService
   )
  {
    // Auto-detect browser language (optional)
    translate.addLangs(['en', 'ar']);
    translate.setDefaultLang('en');
    const browserLang = translate.getBrowserLang();
    const lang = browserLang?.match(/en|ar/) ? browserLang : 'ar';
    translate.use(lang);
    SessionStorageService.setItem(sessionStorageKeys.userLanguage, lang);

  }

  ngOnInit(): void {

    
  }
  
}
