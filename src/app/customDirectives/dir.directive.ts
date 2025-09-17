import { Directive } from '@angular/core';
// src/app/shared/dir.directive.ts
import { TranslateService } from '@ngx-translate/core';
import { ElementRef, OnInit } from '@angular/core'; 
@Directive({
  selector: '[appDir]'
})
export class DirDirective implements OnInit {
  constructor(private el: ElementRef, private translate: TranslateService) {}

  ngOnInit() {
    this.updateDir(this.translate.currentLang);
    this.translate.onLangChange.subscribe(langChangeEvent => {
      this.updateDir(langChangeEvent.lang);
    });
  }

  private updateDir(lang: string) {

    console.log("i am there in dir directive");
    if (lang === 'ar') {
      this.el.nativeElement.dir = 'rtl';
    } else {
      this.el.nativeElement.dir = 'ltr';
    }
  }
}